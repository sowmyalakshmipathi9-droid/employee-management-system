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

}

    

   