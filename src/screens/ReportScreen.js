import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router';
import moment from 'moment';
import { projectsLoadRequest } from '../actions/projects';
import { recordsLoadRequest, recordSubmitRequest, recordRemoveRequest, addRecord, editRecord, reset } from '../actions/records';
import { emptyRecord } from '../reducers/records';

class ReportScreen extends Component {

  constructor(props) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.renderRecord = this.renderRecord.bind(this);
  }

  componentWillMount() {
    this.props.projectsLoadRequest();
    this.props.recordsLoadRequest(this.props.params.date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.date !== nextProps.params.date) {
      this.props.reset();
      this.props.recordsLoadRequest(nextProps.params.date);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.records.forEach((record, index) => {
      if (record !== emptyRecord) {
        const payload = {
          project: record.project,
          description: record.description,
          time_spent: record.time_spent,
        };
        if (record.issue) {
          payload.issue = record.issue;
        }
        if (record.id) {
          payload.id = record.id;
        }
        this.props.recordSubmitRequest(this.props.params.date, payload, index);
      }
    });
  }

  renderRecord(record, index) {
    return (
      <div key={index}>
        <select value={record.project} onChange={(event) => this.props.editRecord(index, 'project', event.target.value)}>
          <option value="">----</option>
          {this.props.projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <input
          placeholder="time spent"
          type="text"
          value={record.time_spent}
          onChange={(event) => this.props.editRecord(index, 'time_spent', event.target.value)}
        />
        <input
          placeholder="issue"
          type="text"
          value={record.issue}
          onChange={(event) => this.props.editRecord(index, 'issue', event.target.value)}
        />
        <input
          placeholder="description"
          type="text"
          value={record.description}
          onChange={(event) => this.props.editRecord(index, 'description', event.target.value)}
        />
        {record.id ? (<button onClick={() => this.props.recordRemoveRequest(record.id, index)}>-</button>): null}
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
          <Link to={`/report/${m.clone().subtract(1, 'days').format('YYYY-MM-DD')}`}>&larr; Previous day</Link>
          &nbsp;
          <Link to={`/report/${m.clone().add(1, 'days').format('YYYY-MM-DD')}`}>Next day &rarr;</Link>
        </div>
        <div>
          <button onClick={this.props.addRecord}>+</button>
        </div>
        <div>
          {this.props.records.map(this.renderRecord)}
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
    loading: state.records.loading,
    projects: state.projects.projectList,
    records: state.records.recordList,
  }),
  {
    projectsLoadRequest,
    recordsLoadRequest,
    addRecord,
    editRecord,
    recordSubmitRequest,
    recordRemoveRequest,
    reset
  }
)(ReportScreen);
