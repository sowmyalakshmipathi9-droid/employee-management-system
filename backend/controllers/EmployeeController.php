<?php

header("Content-Type: application/json");

class EmployeeController
{
    private $employee;

    public function __construct($db)
    {
        // Create Employee model here
        $this->employee = new Employee($db);
    }

    public function index()
    {
        // Get data from model
        $employees = $this->employee->getEmployees();
            // Check if data exists
        if($employees) {
            // Return JSON
            echo json_encode([
                "status" => 200,
                "data" => $employees
            ]);
        } else {

            echo json_encode([
                "status" => 404,
                "message" => "No employees found."
            ]);

        }
    }
}