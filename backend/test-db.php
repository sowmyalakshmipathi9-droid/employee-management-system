<?php

require_once "config/database.php";

$database = new Database();
$db = $database->getConnection();

if ($db) {
    echo "Database Connected Successfully!";
} else {
    echo "Connection Failed!";
}