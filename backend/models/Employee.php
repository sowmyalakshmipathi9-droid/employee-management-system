<?php
require_once "../config/database.php";

class Employee {
    private $conn;

    public function _construct($db)
    {
        $this->$conn = $db;
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

        $statement = $this->conn->prepare($sql);
        $statement->execute();

    }

}

    

   