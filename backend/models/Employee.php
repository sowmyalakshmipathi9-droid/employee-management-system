<?php
require_once "../config/database.php";

class Employee {
    private $conn;

    public function __construct($db)
    {
        // Print "Employee model created";
        $this->conn = $db;
        // print_r($this->conn);
    }

    public function getEmployees($departmentId = null) {
        $sql = "SELECT
                    e.id,
                    e.employee_code,
                    e.first_name,
                    e.last_name,
                    e.email,
                    e.phone,
                    e.department_id,
                    e.designation,
                    e.salary,
                    e.joining_date,
                    e.profile_image,
                    e.status,
                    e.created_at,
                    dept.department_name
                FROM employees e
                JOIN departments dept
                ON e.department_id = dept.id";

        if ($departmentId !== null && $departmentId !== '') {
            $sql .= " WHERE e.department_id = :department_id";
        }

        $sql .= " ORDER BY e.id ASC";

        $statement = $this->conn->prepare($sql);

        if ($departmentId !== null && $departmentId !== '') {
            $statement->bindParam(':department_id', $departmentId, PDO::PARAM_INT);
        }

        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDepartments() {
        $sql = "SELECT id, department_name FROM departments ORDER BY department_name ASC";
        $statement = $this->conn->prepare($sql);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createDepartment($department_name) {
        $sql = "INSERT INTO departments (department_name) VALUES (:department_name)";
        $statement = $this->conn->prepare($sql);
        $statement->bindParam(':department_name', $department_name);

        try {
            $statement->execute();
            return (int) $this->conn->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }
    }

    public function createEmployee($employee_code, $first_name, $last_name, $email, $phone, $department_id, $designation, $salary, $joining_date, $profile_image, $status) {

        $sql = "INSERT INTO employees (employee_code, first_name, last_name, email, phone, department_id, designation, salary, joining_date, profile_image, status) VALUES (:employee_code, :first_name, :last_name, :email, :phone, :department_id, :designation, :salary, :joining_date, :profile_image, :status)";
        $statement = $this->conn->prepare($sql);
        $statement->bindParam(':employee_code', $employee_code);
        $statement->bindParam(':first_name', $first_name);
        $statement->bindParam(':last_name', $last_name);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':phone', $phone);
        $statement->bindParam(':department_id', $department_id);
        $statement->bindParam(':designation', $designation);
        $statement->bindParam(':salary', $salary);
        $statement->bindParam(':joining_date', $joining_date);
        $statement->bindParam(':profile_image', $profile_image);
        $statement->bindParam(':status', $status);
        try {
            $statement->execute();
            return true;
        } catch (PDOException $e) {
            echo json_encode([
                "status" => 500,
                "message" => $e->getMessage()
            ]);
            return false;
        }
    }

    public function deleteEmployee($id) {
        $sql = "DELETE FROM employees WHERE id = :id";
        $statement = $this->conn->prepare($sql);
        $statement->bindParam(':id', $id);
        try {
            $statement->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getEmployeeById($id) {
        $sql = "SELECT * FROM employees WHERE id = :id";
        $statement = $this->conn->prepare($sql);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function updateEmployee($id, $employee_code, $first_name, $last_name, $email, $phone, $department_id, $designation, $salary, $joining_date, $profile_image, $status) {
    $sql = "UPDATE employees SET employee_code = :employee_code, first_name = :first_name, last_name = :last_name, email = :email, phone = :phone, department_id = :department_id, designation = :designation, salary = :salary, joining_date = :joining_date, profile_image = :profile_image, status = :status WHERE id = :id";
    $statement = $this->conn->prepare($sql);
    $statement->bindParam(':id', $id);
    $statement->bindParam(':employee_code', $employee_code);
    $statement->bindParam(':first_name', $first_name);
    $statement->bindParam(':last_name', $last_name);
    $statement->bindParam(':email', $email);
    $statement->bindParam(':phone', $phone);
    $statement->bindParam(':department_id', $department_id);
    $statement->bindParam(':designation', $designation);
    $statement->bindParam(':salary', $salary);
    $statement->bindParam(':joining_date', $joining_date);
    $statement->bindParam(':profile_image', $profile_image);
    $statement->bindParam(':status', $status);

    try {
        $statement->execute();
        return true;
    } catch (PDOException $e) {
        return false;
    }
}


}