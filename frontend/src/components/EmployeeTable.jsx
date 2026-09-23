const EmployeeTable = ({ rows, onView, onEdit, onDelete }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee Code</th>
          <th>Name</th>
          <th>Department</th>
          <th>View</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.employee_code}</td>
            <td>{employee.first_name}</td>
            <td>{employee.department_name}</td>
            <td>
              <button
                type="button"
                className="icon-btn view-btn"
                onClick={() => onView(employee)}
                aria-label={`View ${employee.first_name}`}
                title="View"
              >
                👁
              </button>
            </td>
            <td className="action-cell">
              <button
                type="button"
                className="icon-btn edit-btn"
                onClick={() => onEdit(employee)}
                aria-label={`Edit ${employee.first_name}`}
                title="Edit"
              >
                ✎
              </button>
              <button
                type="button"
                className="icon-btn delete-btn"
                onClick={() => onDelete(employee.id)}
                aria-label={`Delete ${employee.first_name}`}
                title="Delete"
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
