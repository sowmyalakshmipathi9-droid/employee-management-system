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
              Last Name
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={onChange}
                placeholder="Doe"
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
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="9876543210"
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

            <label>
              Designation
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={onChange}
                placeholder="Software Engineer"
              />
            </label>

            <label>
              Salary
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={onChange}
                placeholder="1200000"
                min="0"
                step="0.01"
              />
            </label>

            <label>
              Joining Date
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={onChange}
              />
            </label>

            <label>
              Profile Image URL
              <input
                type="url"
                name="profile_image"
                value={formData.profile_image}
                onChange={onChange}
                placeholder="https://example.com/profile.jpg"
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
