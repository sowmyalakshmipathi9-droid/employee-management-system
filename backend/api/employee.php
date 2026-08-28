<?php

require_once "../config/database.php";
require_once "../models/Employee.php";
require_once "../controllers/EmployeeController.php";

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$controller = new EmployeeController($db);
// echo $_SERVER['REQUEST_METHOD'];
// exit;

if ($_SERVER['REQUEST_METHOD'] === 'GET'){

   if (isset($_GET['id'])) {

        // GET one employee
        $controller->show($_GET['id']);

    } else {

        // GET all employees
        $controller->index();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    $controller->createEmployee($data);

} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    if (!isset($_GET['id'])) {

        http_response_code(400);

        echo json_encode([
            "status" => 400,
            "message" => "Employee ID is required."
        ]);

        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $controller->updateEmployee($_GET['id'], $data);

} else {
    
    http_response_code(405);

    echo json_encode([
        "message" => "Method Not Allowed"
    ]);
}
