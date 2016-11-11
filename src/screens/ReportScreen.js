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
        {record.id ? <button onClick={() => confirm('Are you sure you want to remove this record?') && this.props.recordRemoveRequest(record.id, index)}>-</button> : null}
      </div>
    );
  }

  weekdayProc(m, weekday, curMonth, curMoment) {
    if (curMoment.diff(m, 'days') === 0) {
      const result = <span style={{color: 'red', fontWeight: 'bold'}}>{m.format('DD')}</span>;
      m.add(1, 'days');
      return result;
    }
    if (m.weekday() === weekday && m.month() === curMonth) {
      const result = <Link to={`/report/${m.clone().format('YYYY-MM-DD')}`}>{m.format('DD')}</Link>;
      m.add(1, 'days');
      return result;
    }
  }

  renderCalRow(m, curMoment) {
    const curMonth = m.month();
    return (<tr>
      <td>{this.weekdayProc(m, 1, curMonth, curMoment)}</td>
      <td>{this.weekdayProc(m, 2, curMonth, curMoment)}</td>
      <td>{this.weekdayProc(m, 3, curMonth, curMoment)}</td>
      <td>{this.weekdayProc(m, 4, curMonth, curMoment)}</td>
      <td>{this.weekdayProc(m, 5, curMonth, curMoment)}</td>
      <td>{this.weekdayProc(m, 6, curMonth, curMoment)}</td>
      <td>{this.weekdayProc(m, 0, curMonth, curMoment)}</td>
    </tr>);
  }

  renderMonth(month, year, curMoment) {
    const curDate = moment({year, month, day: 1});
    const lastDate = curDate.clone().endOf('month');
    return (
      <div style={{margin: '15px'}}>
        <h4>{curDate.format('MMMM')}</h4>
        <table>
          <tbody>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
            {curDate.diff(lastDate, 'days') < 0 ? this.renderCalRow(curDate, curMoment) : null}
            {curDate.diff(lastDate, 'days') < 0 ? this.renderCalRow(curDate, curMoment) : null}
            {curDate.diff(lastDate, 'days') < 0 ? this.renderCalRow(curDate, curMoment) : null}
            {curDate.diff(lastDate, 'days') < 0 ? this.renderCalRow(curDate, curMoment) : null}
            {curDate.diff(lastDate, 'days') < 0 ? this.renderCalRow(curDate, curMoment) : null}
          </tbody>
        </table>
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
    const prevMonth = m.clone().startOf('month').subtract(1, 'month');
    const nextMonth = m.clone().startOf('month').add(1, 'month');
    return (
      <div>
        <h3>Report for {m.format('YYYY-MM-DD')}</h3>
        <h3>Total time: {this.props.totalTime} hours</h3>
        <div>
          <button onClick={this.props.addRecord}>+</button>
        </div>
        <div>
          {this.props.records.map(this.renderRecord)}
        </div>
        <div>
          <button disabled={this.props.loading} onClick={this.onSubmit}>Submit</button>
        </div>
        <div style={{display: 'flex'}}>
        {this.renderMonth(prevMonth.month(), prevMonth.year(), m)}
        {this.renderMonth(m.month(), m.year(), m)}
        {this.renderMonth(nextMonth.month(), nextMonth.year(), m)}
        </div>
      </div>
    );
  }

}

function parseTime(record) {
  const result = parseFloat(record.time_spent);
  return isNaN(result) ? 0 : result;
}

export default connect(
  (state) => ({
    loading: state.records.loading,
    projects: state.projects.projectList,
    records: state.records.recordList,
    totalTime: state.records.recordList.map(parseTime).reduce((a, b) => a + b),
  }),
  {
    projectsLoadRequest,
    recordsLoadRequest,
    addRecord,
    editRecord,
    recordSubmitRequest,
    recordRemoveRequest,
    reset,
  }
)(ReportScreen);
