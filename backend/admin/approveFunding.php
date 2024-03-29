<?php
include "../db.php";
session_start();


$data = json_decode(file_get_contents('php://input'), true);

// Access the values
$transactionID = $data['transactionID'];
$userID = $data['userID'];

if(isset($_SESSION["administrator"])){

    if(isset($transactionID) &&  isset($userID)){
        // Find Transaction Data 
        $stmt = $con->prepare("SELECT * FROM `transactions` WHERE md5(`id`) = ? AND `username` = ?");
        $stmt->bind_param("ss", $transactionID, $userID);
        $stmt->execute();
        $result = $stmt->get_result();
        $run_query = $result;
        $count = mysqli_num_rows($run_query);

		$row = mysqli_fetch_array($run_query);
        $transactionType = $row["type"];
        $amount = $row["amount"];

        if($count > 0){
            // Approve TRansaction if found 
            $stmt = $con->prepare("UPDATE `transactions` SET `status` = 'completed' WHERE md5(`id`) = ? AND `username` = ?");
            $stmt->bind_param("ss", $transactionID, $userID);
           if($stmt->execute()){

            $stmt = $con->prepare("SELECT * FROM `user_data`  WHERE `username` = ? LIMIT 1");
            $stmt->bind_param("s", $userID);
            $stmt->execute();
            $result = $stmt->get_result();
            $run_query = $result;  
            $row = mysqli_fetch_array($run_query);
            $currentBalance = $row["current_balance"];
            
            if($transactionType === "deposit" || $transactionType === "depositWalletCredit" && $transactionType != "interestDeposit" && $transactionType != "interestCredit"){
            
                $newBalance = $currentBalance + $amount;

                $stmt = $con->prepare("UPDATE `user_data` SET `current_balance` = ? WHERE `username` = ? LIMIT 1");
                $stmt->bind_param("ss", $newBalance, $userID);
                $stmt->execute();

            }else{
                $newBalance = $currentBalance - $amount;

                $stmt = $con->prepare("UPDATE `user_data` SET `current_balance` = ? WHERE `username` = ? LIMIT 1");
                $stmt->bind_param("s", $newBalance, $userID);
                $stmt->execute();
            }


            $response = array("status" => "succsss", "message" => "Transaction Approved Successfully");
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