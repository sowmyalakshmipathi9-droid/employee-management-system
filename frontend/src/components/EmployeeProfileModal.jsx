const EmployeeProfileModal = ({ employee, onClose }) => {
  if (!employee) {
    return null;
  }

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
          <div className="profile-row">
            <span>Employee ID</span>
            <strong>{employee.id}</strong>
          </div>
          <div className="profile-row">
            <span>Employee Code</span>
            <strong>{employee.employee_code}</strong>
          </div>
          <div className="profile-row">
            <span>Full Name</span>
            <strong>{employee.first_name}</strong>
          </div>
          <div className="profile-row">
            <span>Email</span>
            <strong>{employee.email || 'Not available'}</strong>
          </div>
          <div className="profile-row">
            <span>Department ID</span>
            <strong>{employee.department_id || 'Not available'}</strong>
          </div>
          <div className="profile-row">
            <span>Department</span>
            <strong>{employee.department_name || 'Not available'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileModal;
