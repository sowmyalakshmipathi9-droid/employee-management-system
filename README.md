# Employee Management System

A full-stack employee management application built with PHP/MySQL on the backend and React + Vite on the frontend. It supports employee CRUD operations, department management, search, filtering, pagination, and a polished admin-style dashboard.

## 1. Project Overview

This project allows an organization to maintain employee records and department information in a centralized system. The backend provides a REST-style API, while the frontend displays a dashboard for staff management tasks.

The system includes:

- Add, view, edit, and delete employees
- Department-based filtering
- Search by employee name, code, or department
- Department creation from the dropdown UI
- Employee profile modal
- Auto-generated employee code format like EMP2026001
- Pagination for employee records
- Admin dashboard styling

## 2. Technology Stack

### Backend

- PHP 8+
- MySQL
- PDO for database connectivity

### Frontend

- React 19
- Vite
- JavaScript (ES modules)

### Local Development Environment

- MAMP / XAMPP / WAMP for Apache + MySQL
- Local frontend served via Vite at http://localhost:5173/

## 3. Project Structure

```text
employee-management-system/
├── README.md
├── employee_management.sql
├── backend/
│   ├── api/
│   │   └── employee.php
│   ├── config/
│   │   └── database.php
│   ├── controllers/
│   │   └── EmployeeController.php
│   └── models/
│       └── Employee.php
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── EmployeeFilterToolbar.jsx
│   │   │   ├── EmployeeFormModal.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeProfileModal.jsx
│   │   │   ├── EmployeeTable.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── Timer.jsx
│   │   ├── context/
│   │   │   └── userContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── services/
│   │       └── employeeServices.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
└── .git/
```

## 4. Database Setup

1. Start MySQL in your local server environment.
2. Import the SQL file:
   - employee_management.sql
3. Confirm the database name is:
   - employee_management
4. Ensure the database credentials in [backend/config/database.php](backend/config/database.php) match your local setup.

Default configuration:

```php
private $host = "localhost";
private $db_name = "employee_management";
private $username = "root";
private $password = "root";
```

## 5. Backend Architecture

### API Entry

The API entry point is:

- [backend/api/employee.php](backend/api/employee.php)

This file routes requests based on HTTP method and query parameters.

### Controller Layer

The controller is responsible for validation and request handling:

- [backend/controllers/EmployeeController.php](backend/controllers/EmployeeController.php)

It manages:

- employee listing
- employee creation
- employee update
- employee delete
- department listing
- department creation

### Model Layer

The database logic is in:

- [backend/models/Employee.php](backend/models/Employee.php)

This file contains queries for:

- getEmployees()
- getDepartments()
- createEmployee()
- updateEmployee()
- deleteEmployee()
- createDepartment()

## 6. Frontend Architecture

The frontend is structured around a React UI dashboard.

Key files:

- [frontend/src/App.jsx](frontend/src/App.jsx)
- [frontend/src/components/EmployeeList.jsx](frontend/src/components/EmployeeList.jsx)
- [frontend/src/services/employeeServices.js](frontend/src/services/employeeServices.js)

### Frontend responsibilities

- Load employee data from the API
- Manage add/edit modal flow
- Show employee profile details
- Handle search and filters
- Render paging controls
- Trigger delete and update actions

## 7. API Reference

Base URL:

```text
http://localhost/employee-management-system/backend/api/employee.php
```

### GET employees

```http
GET /backend/api/employee.php
```

Returns all employees.

### GET employees by department

```http
GET /backend/api/employee.php?department_id=2
```

Returns employees in the selected department.

### GET departments

```http
GET /backend/api/employee.php?departments=1
```

Returns all departments.

### GET employee by ID

```http
GET /backend/api/employee.php?id=5
```

Returns a single employee record.

### POST employee

```http
POST /backend/api/employee.php
Content-Type: application/json
```

Request body:

```json
{
  "employee_code": "EMP20260011",
  "first_name": "John",
  "email": "john@example.com",
  "department_id": 2
}
```

### POST department

```http
POST /backend/api/employee.php
Content-Type: application/json
```

Request body:

```json
{
  "department_name": "Operations"
}
```

### PUT employee

```http
PUT /backend/api/employee.php?id=5
Content-Type: application/json
```

Request body:

```json
{
  "employee_code": "EMP20260011",
  "first_name": "John",
  "email": "john@example.com",
  "department_id": 3
}
```

### DELETE employee

```http
DELETE /backend/api/employee.php?id=5
```

## 8. Features Implemented

### Employee Management

- Add new employee
- Edit existing employee
- Delete employees
- View full employee profile

### Department Management

- Create departments from the dropdown UI
- Filter list by department
- Departments are pulled from the departments table

### Dashboard UX

- Search by employee name, employee code, or department
- Pagination with 10 records per page
- Auto-generated employee codes in the format EMP[Year][Serial]
- Admin dashboard styling with cards, tables, and modal forms

## 9. Frontend Setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/
```

## 10. Production Build

```bash
cd frontend
npm run build
```

## 11. Notes and Best Practices

- The frontend is configured to call the PHP API from localhost.
- If the API is served from a different port or domain, update the API URL in [frontend/src/services/employeeServices.js](frontend/src/services/employeeServices.js).
- For MAMP users, Apache usually serves the project from the web root (for example, htdocs) and the backend path resolves as:

```text
http://localhost/employee-management-system/backend/api/employee.php
```

- Keep the database name, user, and password in sync with your local MySQL configuration.

## 12. Future Enhancements

Possible upgrades for this project include:

- employee photo upload
- status management (Active/Inactive)
- sorting by column headers
- export to CSV/PDF
- role-based access control
- unit and integration tests

## 13. Summary

This project is a complete employee management dashboard that follows a structured backend/frontend pattern. It demonstrates a practical full-stack application using PHP, MySQL, and React with clean separation between API logic, controller logic, database access, and UI rendering.
