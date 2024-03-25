<?php

require_once dirname(__DIR__) . "/backend/exportENV.php";

$servername = $_ENV['DB_HOST_RAYSON'];
$username = $_ENV['DB_USER_RAYSON'];
$password = $_ENV['DB_PASS_RAYSON'];
$db = $_ENV["DB_NAME_RAYSON"];



// Create connection
$con = mysqli_connect($servername, $username, $password, $db);

// Check connection
if (!$con) {
    $response = array('status' => 'error', 'Connection Failed:' => mysqli_connect_error());
    echo json_encode($response);
    die("Connection failed: " . mysqli_connect_error());

}


?>