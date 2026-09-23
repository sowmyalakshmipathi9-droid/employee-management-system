<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    http_response_code(200);
    exit();
}
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

   if (isset($_GET['departments'])) {
        $controller->getDepartments();

    } elseif (isset($_GET['id'])) {

        // GET one employee
        $controller->show($_GET['id']);

    } else {

        // GET all employees
        $departmentId = isset($_GET['department_id']) && $_GET['department_id'] !== '' ? $_GET['department_id'] : null;
        $controller->index($departmentId);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['department_name']) && !isset($data['employee_code'])) {
        $controller->createDepartment($data);
        return;
    }

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

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if(!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            "status" => 400,
            "message" => "Employee ID is required."
        ]);
        return;
    }
    $controller->deleteEmployee($_GET['id']);
} 
else {
    
    http_response_code(405);

    echo json_encode([
        "message" => "Method Not Allowed"
    ]);
}
