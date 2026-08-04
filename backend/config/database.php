<?php

 class Database
 {


    private $host = "localhost";
    private $db_name = "employee_management";
    private $username = "root";
    private $password = "root";
    public $conn;

    public function getConnection()
    {
      
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );

            // Set PDO error mode to Exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Set UTF-8 encoding
            $this->conn->exec("SET NAMES utf8");
        } catch (PDOException $exception) {
            echo "Connection Error: " . $exception->getMessage();
        }

        return $this->conn;
    }
 }