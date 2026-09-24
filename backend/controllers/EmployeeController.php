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

    public function index($departmentId = null)
    {
        // Get data from model
        $employees = $this->employee->getEmployees($departmentId);
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

    public function getDepartments()
    {
        $departments = $this->employee->getDepartments();

        if ($departments) {
            echo json_encode([
                "status" => 200,
                "data" => $departments
            ]);
        } else {
            echo json_encode([
                "status" => 404,
                "message" => "No departments found."
            ]);
        }
    }

    public function createDepartment($data)
    {
        $department_name = trim((string)($data['department_name'] ?? ''));

        if ($department_name === '') {
            http_response_code(400);
            echo json_encode([
                "status" => 400,
                "message" => "Department name is required."
            ]);
            return;
        }

        $result = $this->employee->createDepartment($department_name);

        if ($result) {
            http_response_code(201);
            echo json_encode([
                "status" => 201,
                "message" => "Department created successfully.",
                "data" => [
                    "id" => $result,
                    "department_name" => $department_name
                ]
            ]);
            return;
        }

        http_response_code(500);
        echo json_encode([
            "status" => 500,
            "message" => "Failed to create department."
        ]);
    }

    public function createEmployee($data){

        $employee_code = $data['employee_code'] ?? '';
        $first_name = $data['first_name'] ?? '';
        $last_name = $data['last_name'] ?? null;
        $email = $data['email'] ?? '';
        $phone = $data['phone'] ?? null;
        $department_id = $data['department_id'] ?? null;
        $designation = $data['designation'] ?? null;
        $salary = $data['salary'] ?? null;
        $joining_date = $data['joining_date'] ?? null;
        $profile_image = $data['profile_image'] ?? null;
        $status = $data['status'] ?? 'Active';

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
            $result = $this->employee->createEmployee($employee_code, $first_name, $last_name, $email, $phone, $department_id, $designation, $salary, $joining_date, $profile_image, $status);
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

    public function deleteEmployee($id) {
        $employee = $this->employee->getEmployeeById($id);
        if(!$employee) {
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "message" => "Employee not found."
            ]);
            return;
        }
        $result = $this->employee->deleteEmployee($id);
        if($result) {
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "message" => "Employee deleted successfully."

            ]);
            return;
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => 500,
                "message" => "Failed to delete employee."
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

    public function updateEmployee($id, $data) {
        $employee = $this->employee->getEmployeeById($id);
        if (!$employee) {
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "message" => "Employee not found."
            ]);
            return;
        }
        $employee_code = $data['employee_code'] ?? $employee['employee_code'];
        $first_name = $data['first_name'] ?? $employee['first_name'];
        $last_name = $data['last_name'] ?? ($employee['last_name'] ?? null);
        $email = $data['email'] ?? $employee['email'];
        $phone = $data['phone'] ?? ($employee['phone'] ?? null);
        $department_id = $data['department_id'] ?? $employee['department_id'];
        $designation = $data['designation'] ?? ($employee['designation'] ?? null);
        $salary = $data['salary'] ?? ($employee['salary'] ?? null);
        $joining_date = $data['joining_date'] ?? ($employee['joining_date'] ?? null);
        $profile_image = $data['profile_image'] ?? ($employee['profile_image'] ?? null);
        $status = $data['status'] ?? ($employee['status'] ?? 'Active');

        $result = $this->employee->updateEmployee($id, $employee_code, $first_name, $last_name, $email, $phone, $department_id, $designation, $salary, $joining_date, $profile_image, $status);
        if ($result){
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "message" => "Employee updated successfully."
            ]);
        } else {
            http_response_code(500);

            echo json_encode([
                "status" => 500,
                "message" => "Failed to update employee."
            ]);
        }
    }

}