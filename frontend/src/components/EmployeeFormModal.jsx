const EmployeeFormModal = ({
  isOpen,
  editingId,
  formData,
  departments,
  submitting,
  onClose,
  onSubmit,
  onChange,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingId ? 'Modify Employee' : 'Add Employee'}</h3>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close form">
            ×
          </button>
        </div>

        <form className="employee-form" onSubmit={onSubmit}>
          <div className="form-grid">
            <label>
              Employee Code
              <input
                type="text"
                name="employee_code"
                value={formData.employee_code}
                onChange={onChange}
                placeholder="EMP20260011"
                readOnly={!editingId}
                required
              />
            </label>

            <label>
              First Name
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={onChange}
                placeholder="John"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="john@example.com"
                required
              />
            </label>

            <label>
              Department
              <select
                name="department_id"
                value={formData.department_id}
                onChange={onChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : editingId ? 'Update Employee' : 'Add Employee'}
            </button>

            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
