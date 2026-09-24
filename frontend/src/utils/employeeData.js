export const getEmployeeFormDefaults = () => ({
  id: '',
  employee_code: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  department_id: '',
  designation: '',
  salary: '',
  joining_date: '',
  profile_image: '',
  status: 'Active',
  created_at: '',
});

export const normalizeEmployeeRecord = (employee = {}) => ({
  ...getEmployeeFormDefaults(),
  ...employee,
  department_id: employee.department_id ?? '',
  salary: employee.salary ?? '',
  status: employee.status || 'Active',
  profile_image: employee.profile_image || '',
  created_at: employee.created_at || '',
});

export const formatEmployeeValue = (value, fallback = 'Not available') => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  return value;
};
