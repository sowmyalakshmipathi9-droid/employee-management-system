const getEmployees = () => {
  return fetch('http://localhost/employee-management-system/backend/api/employee.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load employees.');
      }
      return response.json();
    })
    .then(result => {
      if (!result || !result.data) {
        throw new Error('No employee data found.');
      }
      return result.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export default getEmployees