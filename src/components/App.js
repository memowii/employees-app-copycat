import React from 'react';

import { EmployeeForm } from './EmployeeForm';
import { EmployeeTable } from './EmployeeTable';

import { Employee as API } from '../api/employee';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.api = new API();
  }

  componentDidMount() {
    this.api.getEmployees().then(employees => this.setState({employees: employees}));
  }

  render() {
    console.log('from render ', this.employees);
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
                  <EmployeeForm/>
                  <EmployeeTable employees={this.state.employees}/>
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
