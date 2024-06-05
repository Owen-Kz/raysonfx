import { ENDPOINT } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookies.js";
import { createNavigation } from "./navbar.js";
import { VAlidateAdmin } from "./validateAdminLogin.js";

const withdrawalContainer = document.getElementById("withdrawalContainer");
const aid = GetCookie("admin_u_id")
VAlidateAdmin()
createNavigation()

getwithdrawals(aid)

function getwithdrawals(user_id) {

    fetch(`${ENDPOINT}/admin/withdrawalList.php?id=${user_id}`, {
        method: "GET"
    }).then(res => res.json())
        .then(data => {
            const withdrawalHistory = data.withdrawalHistory

            if (withdrawalHistory.length > 0) {
                withdrawalHistory.forEach(withdrawal => {
                    let Action

                    const withdrawalID = withdrawal.withdrawalId
                    const withdrawalDetails = withdrawal.withdrawalDetails
                    
                    const wallet = withdrawalDetails.gateway

                    if(withdrawalDetails.status === "pending" || withdrawalDetails.status === "rejected"){
                        Action = `   <form action="${ENDPOINT}/account/approveWithdrawal.php" method="POST">
                        <input type="hidden" name="transactionID" value="${withdrawalID}" />
                        <input type="hidden" name="userID" value="${withdrawalDetails.user_id}" />
        
                        <button class="btn-success" style="padding:1px;width:100px;"> Apporove </button>
                        </form>
        
        
                        <form action="${ENDPOINT}/account/rejectWithdrawal.php" method="POST">
                        <input type="hidden" name="transactionID" value="${withdrawalID}" />
        
                        <input type="hidden" name="userID" value="${withdrawalDetails.user_id}" />
        
                        <button class="btn-danger" style="padding:1px; width:100px;"> Reject </button>
                        </form>`
                    }else if(withdrawalDetails.status === "completed"){
                        Action = `<span class="text-success"> Approved </span>`
                    }
                    withdrawalContainer.innerHTML += `
                <tr>
                <td>${formatTimestamp(withdrawalDetails.date)}</td>
                <td>${withdrawalID}</td>
                <td>$ ${withdrawalDetails.amount} USD</td>
                <td>${wallet}</td>
                <td>${withdrawalDetails.address}</td>
                <td style=""width:150px";>${withdrawalDetails.status}</td>
                <td style="display:flex; flex-direction:column;align-items:center; justify-content:space-between; height:80px;" >
             ${Action}
                </td>
                </tr>`
                });
            } else {
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