<?php
require_once "../api/employee.php";
header("content_type: application/json");

class employeeController {

    public function index(){
        if ($employee) {
            echo json_encode([
                "status" => true,
                "data" => $employee
            ]);
        
            } else {
                echo json_encode([
                    "status" => true,
                    "Message" => "No employee found"
                ]);
        }
    }
}