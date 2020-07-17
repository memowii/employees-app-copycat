import React from 'react';

import './styles/EmployeeTable.css'

export class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
    };
  }

  render() {
    return (
      <table className="EmployeeTable table mt-5">
        <thead>
        <tr>
          <th className="border-top-0">Employee name</th>
          <th className="border-top-0">Employee email</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td className="text-center">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-success btn-group-lg">Edit</button>
                <button type="button" className="btn btn-danger btn-group-lg">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td className="text-center">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-success btn-group-lg">Edit</button>
                <button type="button" className="btn btn-danger btn-group-lg">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td className="text-center">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-success btn-group-lg">Edit</button>
                <button type="button" className="btn btn-danger btn-group-lg">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}