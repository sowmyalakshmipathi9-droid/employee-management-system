<?php

require_once "../config/database.php";
require_once "../models/Employee.php";
require_once "../controllers/EmployeeController.php";

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$controller = new EmployeeController($db);
$controller->index();