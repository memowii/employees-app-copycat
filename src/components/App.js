import React from 'react';

import { EmployeeForm } from './EmployeeForm';
import { EmployeeTable } from './EmployeeTable';

import { Employee as API } from '../api/employee';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      form: {
        name: {value: '', isValid: false},
        email: {value: '', isValid: false},
      },
      submitting: false,
      error: false,
      success: false,
    };
    this.nameInput = React.createRef();
    this.api = new API();
  }

  componentDidMount() {
    this.isValidName = this.isValid('name')
    this.isValidEmail = this.isValid('email');
    this.api.getEmployees().then(employees => this.setState({employees}));
  }

  isValid = inputName => {
    return () => {
      if (this.state.form[inputName].value !== '') {
        this.setState(prevState => ({
          form: {
            ...prevState.form,
            [inputName]: {
              ...prevState.form[inputName],
              isValid: true,
            },
          },
        }));
        return true;
      }
      return false;
    }
  }

  clearStatus = event => {
    this.setState(prevState => ({
      error: false,
      success: false,
    }));
  };

  handleInputChange = event => {
    event.persist();
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [event.target.name]: {
          ...prevState.form[event.target.name],
          value: event.target.value,
        },
      },
    }));
  };

  cleanEmployee = employee => {
    return {
      id: Math.max(...this.state.employees.map(employee => employee.id)) + 1,
      name: employee.name.value,
      email: employee.email.value,
    };
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({submitting: true});
    this.clearStatus();

    const isValidName = this.isValidName(), isValidEmail = this.isValidEmail();
    if (!(isValidName && isValidEmail)) {
      this.setState({error: true});
      return;
    }

    try {
      const response = await this.api.addEmployee(this.state.form);
      if (response) {
        const employee = this.cleanEmployee(response);
        this.setState({
          employees: [...this.state.employees, employee],
          error: false,
          success: true,
          submitting: false,
          form: {
            name: {value: '', isValid: false},
            email: {value: '', isValid: false},
          },
        });
        setTimeout(() => this.focus(), 1500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  focus() {
    this.nameInput.current.focus();
  }

  deleteEmployee = async id => {
    try {
      const response = await this.api.deleteEmployee(id);
      if (response) {
        const employees = this.state.employees.filter(employe => employe.id !== id);
        this.setState({employees});
      }
    } catch (e) {
      console.error(e);
    }
  };

  editEmployee = async (id, updatedEmployee) => {
    try {
      const response = await this.api.editEmployee(id, updatedEmployee);
      if (response) {
        const employees = this.state.employees.slice();
        this.setState({
          employees: this.state.employees.map(employee => employee.id === id ? response : employee),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 offset-lg-2 col-lg-8">
              <header className="my-4">
                <h1>Employees</h1>
              </header>

              <main>
                <article>
                  <EmployeeForm formValues={this.state.form} handleInputChange={this.handleInputChange}
                                onSubmit={this.handleSubmit} submitting={this.state.submitting} error={this.state.error}
                                success={this.state.success} clearStatus={this.clearStatus}
                                nameInput={this.nameInput} />

                  <EmployeeTable employees={this.state.employees} onDeleteEmployee={this.deleteEmployee}
                                 editEmployee={this.editEmployee} />
                </article>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
