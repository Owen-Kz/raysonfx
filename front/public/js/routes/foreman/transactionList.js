import { ENDPOINT } from "../constants.js";
import { GetCookie } from "../setCookies.js";


function GetTransactions(){
    const adminId = GetCookie("admin_u_id")

    if(adminId){
       return fetch(`${ENDPOINT}/admin/transactionList.php?a_id=${adminId}`, {
            method:"GET"
        })
        .then(res => res.json())
        .then(data =>{
            if(data.status === "success"){
                return data.transactionList
            } else {
                throw new Error(data.message);
            }
        })
    }else{
        window.location.href = "https://raysonfinance.vercel.app"
    }
}


export {
    GetTransactions
}