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

    public function getEmployees() {

        $sql = "SELECT
                    e.id,
                    e.employee_code,
                    e.first_name,
                    dept.department_name
                FROM employees e
                JOIN departments dept
                ON e.department_id = dept.id
                LIMIT 5";
        // Print "SQL query: " . $sql . "\n";

        $statement = $this->conn->prepare($sql);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createEmployee($employee_code, $first_name, $email, $department_id) {

        $sql = "INSERT INTO employees (employee_code, first_name, email, department_id) VALUES (:employee_code, :first_name, :email, :department_id)";
        $statement = $this->conn->prepare($sql);
        $statement->bindParam(':employee_code', $employee_code);
        $statement->bindParam(':first_name', $first_name);
         $statement->bindParam(':email', $email);
        $statement->bindParam(':department_id', $department_id);
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

}