<?php

require_once "../config/database.php";
header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

if($db){
    $sql = "Select e.id, e.employee_code, e.first_name, dept.department_name from employees e JOIN departments dept ON e.department_id = dept.id limit 5";

    $stmt = $db->query($sql);

     // Check if the query returned any rows
     $employee = $stmt->fetchAll(PDO::FETCH_ASSOC);
// print_r($employee);
// exit;
       

    // echo $sql;
} else {
    
    echo json_encode([
        "status" => false,
        "message" => "Database connection failed."
    ]);
}
