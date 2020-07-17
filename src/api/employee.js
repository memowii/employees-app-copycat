export class Employee {
  constructor() {
    this.API_URL = 'https://jsonplaceholder.typicode.com/users';
  }

  async getEmployees() {
    try {
      const response = await fetch(this.API_URL);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async addEmployee(employee) {
    try {
      const response = await fetch(this.API_URL, {
          method: 'POST',
          body: JSON.stringify(employee),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        },
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async editEmployee(id, updatedEmployee) {
    try {
      const response = await fetch(new URL(id, this.API_URL).href, {
          method: 'PUT',
          body: JSON.stringify(updatedEmployee),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        },
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEmployee(id) {
    try {
      const response = await fetch(new URL(id, this.API_URL), {
        method: 'DELETE',
      });
      return response.status === 200;
    } catch (error) {
      console.error(error);
    }
  }
}