import React from 'react';
// import './styles/App.css';

import { EmployeeForm } from './EmployeeForm';
import { EmployeeTable} from './EmployeeTable';

function App() {
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
                <EmployeeTable />
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
