import React, { useState } from 'react';

import './styles/EmployeeTable.css';

export function EmployeeTable(props) {
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cachedEmployee, setCachedEmployee] = useState(null);

  function editMode(employee) {
    setCachedEmployee(Object.assign({}, employee));
    setEditing(employee.id);
    setName(employee.name);
    setEmail(employee.email);
  }

  function cancelEdit(employee) {
    Object.assign(employee, cachedEmployee);
    setEditing(null);
  }

  function editEmployee(employee) {
    const updatedEmployee = {...employee};
    updatedEmployee.name = name;
    updatedEmployee.email = email;

    if (employee.name === '' || employee.email === '') return;
    props.editEmployee(updatedEmployee.id, updatedEmployee);
    setEditing(null);
    setName(null);
    setEmail(null);
  }

  return (
    <div className="table-responsive">
      {props.employees.length < 1 && <p className="mt-4">No employees found.</p>}
      <p className="table-message mt-4 text-muted small text-center">
        Scroll to the right on the table to see other options.</p>
      <table className="EmployeeTable table">
        <thead>
        <tr>
          <th className="border-top-0">Employee name</th>
          <th className="border-top-0">Employee email</th>
        </tr>
        </thead>
        <tbody>
        {props.employees.map(employee => (
          <tr key={employee.id}>
            <td>
              {editing === employee.id ?
                <input type="text" value={name} onChange={event => setName(event.target.value)} />
                : <>{employee.name}</>
              }
            </td>
            <td>
              {editing === employee.id ?
                <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                : <>{employee.email}</>
              }
            </td>
            <td className="text-center">
              <div className="btn-group">
                {
                  editing === employee.id ?
                    <>
                      <button type="button" className="btn btn-success btn-group-lg"
                              onClick={() => editEmployee(employee)}>Save
                      </button>
                      <button type="button" className="btn btn-danger btn-group-lg"
                              onClick={() => cancelEdit(employee)}>Cancel
                      </button>
                    </>
                    : <>
                      <button type="button" className="btn btn-success btn-group-lg"
                              onClick={() => editMode(employee)}>Edit
                      </button>
                      <button type="button" className="btn btn-danger btn-group-lg"
                              onClick={() => props.onDeleteEmployee(employee.id)}>Delete
                      </button>
                    </>
                }
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}