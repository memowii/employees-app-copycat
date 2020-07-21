import React from 'react';

export function EmployeeForm(props) {

  return (
    <form onSubmit={props.onSubmit}>
      <div className="form-group">
        <label>Employee name</label>
        <input type="text"
               className={`form-control ${props.submitting && !props.formValues.name.isValid && 'is-invalid'}`}
               name="name" value={props.formValues.name.value} onChange={props.handleInputChange}
               onFocus={props.clearStatus} ref={props.nameInput} onKeyPress={props.clearStatus} />
        <div className="invalid-feedback">
          Please provide name.
        </div>
      </div>
      <div className="form-group">
        <label>Employee Email</label>
        <input type="email"
               className={`form-control ${props.submitting && !props.formValues.email.isValid && 'is-invalid'}`}
               name="email" value={props.formValues.email.value} onChange={props.handleInputChange}
               onFocus={props.clearStatus} />
        <div className="invalid-feedback">
          Please provide email.
        </div>
      </div>
      {props.error && props.submitting &&
      <div className="alert alert-danger">
        Please fill out all required fields!
      </div>
      }
      {props.success &&
      <div className="alert alert-success">
        Employee successfully added ✅
      </div>
      }
      <button type="submit" className="btn btn-success">Add Employee</button>
    </form>
  );

}