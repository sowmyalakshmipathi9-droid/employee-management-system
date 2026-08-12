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

    $controller->index();

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    $controller->createEmployee($data);

} else {
    
    http_response_code(405);

    echo json_encode([
        "message" => "Method Not Allowed"
    ]);
}
