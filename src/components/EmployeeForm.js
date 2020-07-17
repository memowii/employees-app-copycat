import React from 'react';

export class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      error: false,
      success: false,
      employee: {
        name: '',
        email: '',
      },
    };
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Employee name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Employee Email</label>
          <input type="email" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-success">Add Employee</button>
      </form>
    );
  }
}