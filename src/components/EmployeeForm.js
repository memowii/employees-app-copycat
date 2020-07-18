import React from 'react';

export class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      error: false,
      success: false,
    };
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Employee name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name"
                 value={this.props.formValues.name} onChange={this.props.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Employee Email</label>
          <input type="email" className="form-control" id="exampleInputPassword1" name="email"
                 value={this.props.formValues.email} onChange={this.props.handleInputChange} />
        </div>
        <button type="submit" className="btn btn-success">Add Employee</button>
      </form>
    );
  }
}