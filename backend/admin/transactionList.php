<?php
include "../db.php";
session_start();

$adminID = $_GET["a_id"];

if(isset($adminID)){
    $stmt = $con->prepare("SELECT * FROM `administrator` WHERE md5(`id`) = ?");
    // $stmt->bind_param("ss", $transactionID, $userID);
    $stmt->execute();
    $result = $stmt->get_result();
    $run_query = $result;

    $row = mysqli_fetch_array($run_query);

    $adminUSER = $rpw["username"];
    if(isset($_SESSION["administrator"]) && $adminUSER){


        $stmt = $con->prepare("SELECT * FROM `transactions` WHERE 1");
        // $stmt->bind_param("ss", $transactionID, $userID);
        $stmt->execute();
        $result = $stmt->get_result();
        $run_query = $result;
        // $run_query = $result;    
        $count = mysqli_num_rows($run_query);

		$row = mysqli_fetch_array($run_query);

        if($count > 0){
         
            $response = array("status" => "succsss", "message" => "Transactions List", "transactionList" => $row);
            echo json_encode($response);
      
        }else{
            $response = array("status" => "error", "message" => "Transaction Not Found", "transactionList" => "[]");
           echo json_encode($response);
        }

} 
else{
    $response = array("status" => "error", "message" => "Invalid Session Please login", "transactionList" => "[]");
   echo json_encode($response);
} 
}
else{
    $response = array("status" => "error", "message" => "Unathorized Access", "transactionList" => "[]");
   echo json_encode($response);
}
