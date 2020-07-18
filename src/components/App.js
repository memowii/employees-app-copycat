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
        name: '',
        email: '',
      },
    };
    this.api = new API();
  }

  componentDidMount() {
    this.api.getEmployees().then(employees => this.setState({employees}));
  }

  handleInputChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await this.api.addEmployee(this.state.form);
      if (response) this.setState({employees: [...this.state.employees, response]});
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
                                onSubmit={this.handleSubmit} />
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
