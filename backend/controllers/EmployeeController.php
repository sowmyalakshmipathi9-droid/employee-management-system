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

    public function createEmployee($data){

        $employee_code = $data['employee_code'];
        $first_name = $data['first_name'];
        $email = $data['email'];
        $department_id = $data['department_id'];

        if (empty($employee_code)) {

        http_response_code(400);

            echo json_encode([
                "status" => 400,
                "message" => "Employee code is required."
            ]);

            return;
        }

        if (empty($first_name)) {

            http_response_code(400);

            echo json_encode([
                "status" => 400,
                "message" => "First name is required."
            ]);

            return;
        }
                if (empty($email)) {

            http_response_code(400);

            echo json_encode([
                "status" => 400,
                "message" => "Email is required."
            ]);

            return;
        }

        if (empty($department_id)) {

            http_response_code(400);

            echo json_encode([
                "status" => 400,
                "message" => "Department is required."
            ]);

            return;
        } 
             // Call the model to create employee
            $result = $this->employee->createEmployee($employee_code, $first_name, $email, $department_id);
            if($result){
                http_response_code(201);
                echo json_encode([
                    "status" => 201,
                    "message" => "Employee created successfully."
                ]);
                return;
            } else {
                http_response_code(500); 
                echo json_encode([
                    "status" => 500,
                    "message" => "Failed to create employee."
                ]);
            }
       
    }

    public function show($id){
    // get employee from model
        // $employees = $this->employee->getEmployees();
        $employee = $this->employee->getEmployeeById($id);
    // Check whether the employee exists
    if($employee){
        // return JSON response with employee data
        http_response_code(200);
        echo json_encode([
            "status" => 200,
            "data" => $employee
        ]);
    } else {
        // return JSON response with error message
        http_response_code(404);
        echo json_encode([
            "status" => 404,
            "message" => "Employee not found."
        ]);
    }
    }

}