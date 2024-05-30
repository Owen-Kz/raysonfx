import { ENDPOINT } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookies.js";
const withdrawalContainer = document.getElementById("withdrawalContainer");

 function getwithdrawals(user_id){

   
   fetch(`${ENDPOINT}/withdrawals/withdrawalList.php?uid=${user_id}`, {
            method:"GET"
        }).then(res => res.json())
        .then(data => {
        const withdrawalHistory = data.withdrawalHistory

        if(withdrawalHistory.length > 0){
            withdrawalHistory.forEach(withdrawal => {
                const withdrawalID = withdrawal.withdrawalId
                const withdrawalDetails = withdrawal.withdrawalDetails

                const wallet = withdrawalDetails.gateway



                withdrawalContainer.innerHTML += `
                <tr>
                <td>${formatTimestamp(withdrawalDetails.date)}</td>
                <td>${withdrawalID}</td>
                <td>$ ${withdrawalDetails.amount} USD</td>
                <td>${wallet}</td>
                <td>${withdrawalDetails.address}</td>
                <td>${withdrawalDetails.status}</td>
                </tr>`
            });
        }else{
            withdrawalContainer.innerHTML = `
            <tr>
            <td colspan="100%" class="text-center">
                No withdrawal Found</td>
        </tr>`
        }
      
        
               
        })

     
}

export {
    getwithdrawals
}