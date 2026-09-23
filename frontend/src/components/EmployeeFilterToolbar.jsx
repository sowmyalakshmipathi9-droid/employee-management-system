const EmployeeFilterToolbar = ({
  departments,
  selectedDepartment,
  searchTerm,
  onDepartmentChange,
  onSearchChange,
  onAddDepartmentClick,
}) => {
  return (
    <div className="toolbar-row">
      <div className="filter-row department-filter-wrap">
        <label htmlFor="departmentFilter">Filter by Department</label>
        <select
          id="departmentFilter"
          value={selectedDepartment}
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.department_name}
            </option>
          ))}
          <option value="__add_new_department__">+ Add New Department</option>
        </select>
      </div>

      <div className="search-box">
        <label htmlFor="employeeSearch">Search</label>
        <input
          id="employeeSearch"
          type="text"
          placeholder="Search by employee name, code or department"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default EmployeeFilterToolbar;
