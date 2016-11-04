import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router';
import moment from 'moment';
import { projectsLoadRequest } from '../actions/projects';
import { recordsLoadRequest } from '../actions/records';
import { addLine, removeLine, editLine } from '../actions/lines';
import ErrorList from '../components/ErrorList';

class ReportScreen extends Component {

  constructor(props) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.renderLine = this.renderLine.bind(this);
  }

  componentWillMount() {
    this.props.projectsLoadRequest();
    this.props.recordsLoadRequest(this.props.params.date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.date !== nextProps.params.date) {
      this.props.recordsLoadRequest(nextProps.params.date);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    for (const line of this.props.lines) {
      console.log(line);
    }
  }

  renderLine(line, index) {
    return (
      <div key={index}>
        <select onChange={(event) => this.props.editLine(index, 'project', event.target.value)}>
          <option value={null}>---- </option>
          {this.props.projects.map((project) => (
            <option selected={line.project == project.id} key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <input
          placeholder="hours"
          type="text"
          value={line.hours}
          onChange={(event) => this.props.editLine(index, 'hours', event.target.value)}
        />
        <input
          placeholder="issue"
          type="text"
          value={line.issue}
          onChange={(event) => this.props.editLine(index, 'issue', event.target.value)}
        />
        <input
          placeholder="comment"
          type="text"
          value={line.comment}
          onChange={(event) => this.props.editLine(index, 'comment', event.target.value)}
        />
      </div>
    );
  }

  render() {
    const m = moment(this.props.params.date, 'YYYY-MM-DD');
    if (!m.isValid()) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: this.props.location },
        }}
        />
      );
    }
    return (
      <div>
        <div>Report for {m.format('YYYY-MM-DD')}</div>
        <div>
          <Link to={`/report/${m.clone().subtract(1, 'days').format('YYYY-MM-DD')}`}>&larr; Previous day</Link>
          &nbsp;
          <Link to={`/report/${m.clone().add(1, 'days').format('YYYY-MM-DD')}`}>Next day &rarr;</Link>
        </div>
        <div>
          <button onClick={this.props.addLine}>+</button>
          <button onClick={this.props.removeLine}>-</button>
        </div>
        <div>
          {this.props.lines.map(this.renderLine)}
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    projects: state.projects.projectList,
    lines: state.lines,
  }),
  {
    projectsLoadRequest,
    recordsLoadRequest,
    addLine,
    removeLine,
    editLine,
  }
)(ReportScreen);
