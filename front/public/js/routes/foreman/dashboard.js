

import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookies.js";
import { createNavigation } from "./navbar.js";
import { GetTransactions } from "./transactionList.js";

// ValidateLogin()
const uid = GetCookie("admin_u_id")
const transactionsContainer = document.getElementById("recentTransactionsContainer");

createNavigation()


const TransactionS = await GetTransactions()
TransactionS.forEach(transactionDetail =>{
    const transactionList = new Array(JSON.stringify(transactionDetail.transactionDetails))
console.log(transactionDetail.trans_id)
if(transactionList.length > 0){
    transactionList.forEach(transaction => {
        const TransactionArray = new Array(JSON.parse(transaction))
       
        const transactionId =  new Array(JSON.parse(JSON.stringify(transactionDetail)))[0].transactionId

        const transactonAmount = TransactionArray[0].amount 
        const userID = TransactionArray[0].username 
        const date = TransactionArray[0].date
        const status = TransactionArray[0].status 
        const reciept = TransactionArray[0].fileURL 
        const transactionType = TransactionArray[0].type

        let Status

        if(status === "completed"){
            Status = `<button class="btn text-success">Approved</button>
            <form  method="POST" action="../../backend/admin/rejectTransaction.php">
            <input type="hidden" value="${transactionId}" name="transactionID">
            <input type="hidden" value="${userID}" name="userID">
            <button class="btn btn-danger " style="padding: 10px; color:3333">Reject</button>
        </form>`
        }else if(status === "rejected"){
            Status = `
            <button class="btn text-danger">Rejected</button>
            <form method="POST" action="../../backend/admin/approveFunding.php">
            <input type="hidden" value="${transactionId}" name="transactionID">
            <input type="hidden" value="${userID}" name="userID">
            <button class="btn  btn-success" style="padding: 10px;">Approve</button>
        </form>`
        }else{
            Status = ` <form method="POST" action="../../backend/admin/approveFunding.php">
            <input type="hidden" value="${transactionId}" name="transactionID">
            <input type="hidden" value="${userID}" name="userID">
            <button class="btn  btn-success" style="padding: 10px;">Approve</button>
        </form>
        <form  method="POST" action="../../backend/admin/rejectTransaction.php">
            <input type="hidden" value="${transactionId}" name="transactionID">
            <input type="hidden" value="${userID}" name="userID">
            <button class="btn btn-danger " style="padding: 10px; color:3333">Reject</button>
        </form>`
        }

        transactionsContainer.innerHTML += `      <tr >
        <td>${formatTimestamp(date)}</td>
        <td>
            <div style="color: rgb(220, 220, 220); font-size: 12px;">${transactionType}:</div>
           <div>
            <b>${transactionId}</b>
           </div> 
        <div><a href="${reciept}" style="color: goldenrod;" target=_blank><i>View Receipt</i></a></div></td>

        <td>
            $ ${transactonAmount}
        </td>

        <td >
            <div style="width: 200px;">${userID}</div>
        </td>


        <td>
           ${Status}
        </td>
    </tr>`
    });
}else{
    console.log(transactionList.length)
}

})
