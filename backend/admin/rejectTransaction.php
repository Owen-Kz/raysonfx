<?php
include "../db.php";
session_start();


$data = json_decode(file_get_contents('php://input'), true);

// Access the values
$transactionID = $data['transactionID'];
$userID = $data['userID'];

if(isset($_SESSION["administrator"])){

    if(isset($trsnsactionID) &&  isset($userID)){
        // Find Transaction Data 
        $stmt = $con->prepare("SELECT * FROM `transactions` WHERE md5(`id`) = ? AND `username` = ?");
        $stmt->bind_param("ss", $transactionID, $userID);
        $stmt->execute();
        $result = $stmt->get_result();
        $run_query = $result;
        // $run_query = $result;    
        $count = mysqli_num_rows($run_query);

		$row = mysqli_fetch_array($run_query);

        if($count > 0){
            // Approve TRansaction if found 
            $stmt = $con->prepare("UPDATE `transactions` SET `status` = 'rejected' WHERE md5(`id`) = ? AND `username` = ?");
            $stmt->bind_param("ss", $transactionID, $userID);
           if($stmt->execute()){
            $response = array("status" => "succsss", "message" => "Transaction Rejected Successfully");
            echo json_encode($response);
           }else{
            $response = array("status" => "error", "message" =>  "Error: " . $stmt->error);
           echo json_encode($response);
           }
           
        }else{
            $response = array("status" => "error", "message" => "Transaction Not Found");
           echo json_encode($response);
        }
    }

}