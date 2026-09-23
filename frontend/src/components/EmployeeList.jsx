import { useState, useEffect } from 'react';
import {
  createDepartment,
  createEmployee,
  deleteEmployee,
  getDepartments,
  getEmployees,
  updateEmployee,
} from '../services/employeeServices.js';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeFilterToolbar from './EmployeeFilterToolbar.jsx';
import EmployeeFormModal from './EmployeeFormModal.jsx';
import EmployeeProfileModal from './EmployeeProfileModal.jsx';
import Pagination from './Pagination.jsx';

const initialFormState = {
  employee_code: '',
  first_name: '',
  email: '',
  department_id: '',
};

const ITEMS_PER_PAGE = 10;

const generateEmployeeCode = (employeeList) => {
  const currentYear = new Date().getFullYear();
  let highestSerial = 0;

  employeeList.forEach((employee) => {
    const match = String(employee.employee_code || '').match(/^EMP(\d{4})(\d{3,})$/);

    if (match) {
      const [, year, serial] = match;

      if (Number(year) === currentYear) {
        const numericSerial = Number(serial);

        if (!Number.isNaN(numericSerial) && numericSerial > highestSerial) {
          highestSerial = numericSerial;
        }
      }
    }
  });

  const nextSerial = highestSerial + 1;
  return `EMP${currentYear}${String(nextSerial).padStart(3, '0')}`;
};

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadEmployees = async (departmentId = 'all') => {
    setLoading(true);
    try {
      const data = await getEmployees(departmentId === 'all' ? null : departmentId);
      setEmployees(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadEmployees('all');
  }, []);

  useEffect(() => {
    loadEmployees(selectedDepartment);
  }, [selectedDepartment]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDepartmentDropdownChange = (value) => {
    if (value === '__add_new_department__') {
      setIsDepartmentModalOpen(true);
      setSelectedDepartment('all');
      return;
    }

    setSelectedDepartment(value);
  };

  const handleAddDepartment = async (event) => {
    event.preventDefault();

    const trimmedName = newDepartmentName.trim();

    if (!trimmedName) {
      setError('Department name is required.');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      const response = await createDepartment(trimmedName);
      const newDepartment = response?.data;

      await loadDepartments();
      if (newDepartment?.id) {
        setSelectedDepartment(String(newDepartment.id));
      }
      setNewDepartmentName('');
      setIsDepartmentModalOpen(false);
      setSuccessMessage('Department created successfully.');
      await loadEmployees(String(newDepartment?.id || selectedDepartment));
    } catch (err) {
      setError(err.message || 'Unable to create department.');
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      employee.employee_code?.toLowerCase().includes(query) ||
      employee.first_name?.toLowerCase().includes(query) ||
      employee.department_name?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartment, searchTerm]);

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const openAddModal = () => {
    const generatedCode = generateEmployeeCode(employees);
    setFormData({
      ...initialFormState,
      employee_code: generatedCode,
    });
    setEditingId(null);
    setIsModalOpen(true);
    setError('');
    setSuccessMessage('');
  };

  const openEditModal = (employee) => {
    setEditingId(employee.id);
    setFormData({
      employee_code: employee.employee_code,
      first_name: employee.first_name,
      email: employee.email || '',
      department_id: employee.department_id || '',
    });
    setError('');
    setSuccessMessage('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');

    if (!confirmDelete) {
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      await deleteEmployee(id);
      if (editingId === id) {
        resetForm();
      }
      await loadEmployees();
      setSuccessMessage('Employee deleted successfully.');
    } catch (err) {
      setError(err.message || 'Unable to delete employee.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const payload = {
        ...formData,
        department_id: Number(formData.department_id),
      };

      if (editingId) {
        await updateEmployee(editingId, payload);
        setSuccessMessage('Employee updated successfully.');
      } else {
        await createEmployee(payload);
        setSuccessMessage('Employee added successfully.');
      }

      closeModal();
      await loadEmployees();
    } catch (err) {
      setError(err.message || (editingId ? 'Unable to update employee.' : 'Unable to add employee.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div className="employee-container">
      <div className="page-header">
        <div>
          {/* <p className="eyebrow">HR Management</p> */}
          
        </div>
        <button type="button" className="primary-btn" onClick={openAddModal}>
          + Add New Employee
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span>Total Employees</span>
          <strong>{employees.length}</strong>
        </div>
        <div className="stat-card">
          <span>Active</span>
          <strong>{employees.length}</strong>
        </div>
        <div className="stat-card">
          <span>Departments</span>
          <strong>{departments.length}</strong>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <EmployeeFilterToolbar
        departments={departments}
        selectedDepartment={selectedDepartment}
        searchTerm={searchTerm}
        onDepartmentChange={handleDepartmentDropdownChange}
        onSearchChange={setSearchTerm}
      />

      <div className="table-card">
        <div className="table-header">
          <h3>Employee List</h3>
        </div>

        {filteredEmployees.length === 0 ? (
          <p className="empty-state">No employees found.</p>
        ) : (
          <>
            <EmployeeTable
              rows={paginatedEmployees}
              onView={setViewEmployee}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <EmployeeFormModal
        isOpen={isModalOpen}
        editingId={editingId}
        formData={formData}
        departments={departments}
        submitting={submitting}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      {isDepartmentModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDepartmentModalOpen(false)}>
          <div className="modal-card modal-small" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Department</h3>
              <button type="button" className="close-btn" onClick={() => setIsDepartmentModalOpen(false)} aria-label="Close department form">
                ×
              </button>
            </div>

            <form className="employee-form" onSubmit={handleAddDepartment}>
              <label>
                Department Name
                <input
                  type="text"
                  value={newDepartmentName}
                  onChange={(event) => setNewDepartmentName(event.target.value)}
                  placeholder="e.g. Operations"
                  required
                />
              </label>

              <div className="form-actions">
                <button type="submit">Save Department</button>
                <button type="button" className="secondary-btn" onClick={() => setIsDepartmentModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <EmployeeProfileModal employee={viewEmployee} onClose={() => setViewEmployee(null)} />
    </div>
  );
}

export default EmployeeList