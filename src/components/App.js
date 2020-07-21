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
    this.api.getEmployees().then(employees => this.setState({employees}));
  }

  isValidName() {
    if (this.state.form.name.value !== '') {
      this.setState(prevState => ({
        form: {
          ...prevState.form,
          name: {
            ...prevState.form.name,
            isValid: true,
          },
        },
      }));
      return true;
    }

    return false;
  }

  isValidEmail() {
    if (this.state.form.email.value !== '') {
      this.setState(prevState => ({
        form: {
          ...prevState.form,
          email: {
            ...prevState.form.email,
            isValid: true,
          },
        },
      }));
      return true;
    }

    return false;
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
        response.id = Math.max(...this.state.employees.map(o => o.id)) + 1;
        this.setState({
          employees: [...this.state.employees, response],
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

                  <EmployeeTable employees={this.state.employees} />
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
