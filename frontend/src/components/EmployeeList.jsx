import { useState, useEffect } from 'react';
import getEmployees from '../services/employeeServices.js';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployees()
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="employee-container">
      <h2>Employee List</h2>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Code</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employee_code}</td>
              <td>{employee.first_name}</td>
              <td>{employee.department_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList