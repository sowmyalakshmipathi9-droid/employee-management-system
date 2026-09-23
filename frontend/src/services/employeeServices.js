const API_URL = 'http://localhost/employee-management-system/backend/api/employee.php';

const getErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return errorData?.message || `Request failed with status ${response.status}.`;
  } catch {
    return `Request failed with status ${response.status}.`;
  }
};

export const getEmployees = async (departmentId = null) => {
  const url = departmentId ? `${API_URL}?department_id=${departmentId}` : API_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result = await response.json();

  if (!result || !result.data) {
    throw new Error('No employee data found.');
  }

  return result.data;
};

export const getDepartments = async () => {
  const response = await fetch(`${API_URL}?departments=1`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result = await response.json();

  if (!result || !result.data) {
    throw new Error('No departments found.');
  }

  return result.data;
};

export const createDepartment = async (departmentName) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ department_name: departmentName }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || 'Failed to add department.');
  }

  return result;
};

export const createEmployee = async (employeeData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || 'Failed to add employee.');
  }

  return result;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || 'Failed to update employee.');
  }

  return result;
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || 'Failed to delete employee.');
  }

  return result;
};

export default getEmployees