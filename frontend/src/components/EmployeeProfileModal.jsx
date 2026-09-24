import { formatEmployeeValue, normalizeEmployeeRecord } from '../utils/employeeData.js';

const EmployeeProfileModal = ({ employee, onClose }) => {
  if (!employee) {
    return null;
  }

  const normalizedEmployee = normalizeEmployeeRecord(employee);
  const profileFields = [
    { label: 'Employee ID', value: normalizedEmployee.id },
    { label: 'Employee Code', value: normalizedEmployee.employee_code },
    { label: 'First Name', value: normalizedEmployee.first_name },
    { label: 'Last Name', value: normalizedEmployee.last_name },
    { label: 'Email', value: normalizedEmployee.email },
    { label: 'Phone', value: normalizedEmployee.phone },
    { label: 'Department ID', value: normalizedEmployee.department_id },
    { label: 'Department', value: normalizedEmployee.department_name },
    { label: 'Designation', value: normalizedEmployee.designation },
    { label: 'Salary', value: normalizedEmployee.salary },
    { label: 'Joining Date', value: normalizedEmployee.joining_date },
    { label: 'Profile Image', value: normalizedEmployee.profile_image },
    { label: 'Status', value: normalizedEmployee.status },
    { label: 'Created At', value: normalizedEmployee.created_at },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card profile-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Employee Profile</h3>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close profile">
            ×
          </button>
        </div>

        <div className="profile-grid">
          {profileFields.map((field) => (
            <div key={field.label} className="profile-row">
              <span>{field.label}</span>
              <strong>{formatEmployeeValue(field.value)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileModal;
