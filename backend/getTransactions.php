<?php 

include 'db.php';

session_start();

$userId = $_GET["uid"];


if(isset($userId)){

    $stmt = $con->prepare("SELECT * FROM `user_data` WHERE md5(`id`) = ? AND verification_email != 'unverified' LIMIT 1");
    $stmt->bind_param("s", $userId);
    
    if($stmt->execute()){

    $result = $stmt->get_result();
    
    // $run_query = mysqli_query($con,$sql);
    $run_query = $result;    
    $count = mysqli_num_rows($run_query);
    
   
	//if user record is available in database then $count will be equal to 1

	if($count == 1){
        // Get and verify the users password if the account exists  
        $row = mysqli_fetch_array($run_query);
        $email = $_SESSION["user_email"];
        $username = $row["username"];
        $accountBalance = $row["current_balance"];

        $stmt = $con->prepare("SELECT * FROM `transactions` WHERE `username` = ? ");
        $stmt->bind_param("s", $username);
        
        if($stmt->execute()){

        $result = $stmt->get_result();
    
        $count = mysqli_num_rows($run_query);
    
        if($count > 0){
            $transactionsList = array(); // Initialize an array to store all transactions

        while ($row = $result->fetch_assoc()) {
            // Loop through each row in the result set and append it to the transactionsList array
            // $transactionsList[] =  $row;
            $transactionsList[] = array("transactionId" => md5($row['id']), "transactionDetails" => $row);
        }
   
        $response = array('status' => 'success', 'message' => 'Transaction History', 'TransactionHistory' => $transactionsList);
        echo json_encode($response);
    }
    
    }
    else {
        $response = array('status' => 'error', 'message' => 'No Transaction Found', 'TransactionHistory' => '[]');
        echo json_encode($response);
    }
    
}else{
   
    $response = array('status' => 'error', 'message' => "Error: " . $stmt->error, 'TransactionHistory' => '[]');
    echo json_encode($response);
}
}
}