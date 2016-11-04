import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router';
import moment from 'moment';
import { projectsLoadRequest } from '../actions/projects';
import { recordsLoadRequest, recordSubmitRequest } from '../actions/records';
import { addLine, removeLine, editLine, clearLine, clearLines } from '../actions/lines';
import { emptyLine } from '../reducers/lines';
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
      if (line !== emptyLine) {
        const payload = {
          project: line.project,
          comment: line.comment,
          time_spent: line.time_spent,
        };
        if (line.issue) {
          payload.issue = line.issue;
        }
        this.props.recordSubmitRequest(this.props.params.date, payload);
      }
    }
  }

  renderLine(line, index) {
    return (
      <div key={index}>
        <select value={line.project} onChange={(event) => this.props.editLine(index, 'project', event.target.value)}>
          <option value="">----</option>
          {this.props.projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <input
          placeholder="time_spent"
          type="text"
          value={line.time_spent}
          onChange={(event) => this.props.editLine(index, 'time_spent', event.target.value)}
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
        <h3>Report for {m.format('YYYY-MM-DD')}</h3>
        <div>
          <h4>Records:</h4>
          {this.props.records.map((record) => (
            this.renderLine(record)
          ))}
        </div>
        <div>
          <Link to={`/report/${m.clone().subtract(1, 'days').format('YYYY-MM-DD')}`}>&larr; Previous day</Link>
          &nbsp;
          <Link to={`/report/${m.clone().add(1, 'days').format('YYYY-MM-DD')}`}>Next day &rarr;</Link>
        </div>
        <div>
          <button onClick={this.props.addLine}>+</button>
          <button onClick={this.props.removeLine}>-</button>
          <button onClick={this.props.clearLines}>clear</button>
        </div>
        <div>
          {this.props.lines.map(this.renderLine)}
        </div>
        <div>
          <button disabled={this.props.loading} onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    lines: state.lines,
    loading: state.records.loading,
    projects: state.projects.projectList,
    records: state.records.recordList,
  }),
  {
    projectsLoadRequest,
    recordsLoadRequest,
    addLine,
    removeLine,
    editLine,
    clearLine,
    clearLines,
    recordSubmitRequest,
  }
)(ReportScreen);
