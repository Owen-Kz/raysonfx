

import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookies.js";
import { createNavigation } from "./navbar.js";
import { GetNames } from "./names.js";
import { ENDPOINT } from "../constants.js";

// ValidateLogin()
const uid = GetCookie("admin_u_id")
const usersContainer = document.getElementById("usersContainer");

createNavigation()


const userS = await GetNames()
userS.forEach(userDetail =>{
    const userList = new Array(JSON.stringify(userDetail.usersDetails))
if(userList.length > 0){
    userList.forEach(user => {
        const userArray = new Array(JSON.parse(user))
       
        // const userId =  new Array(JSON.parse(JSON.stringify(userDetail)))[0].userId
        const nameId = userDetail.usersId
        const amount = userArray[0].amount
        const fullname = userArray[0].fullname 
        const transactionType = userArray[0].transaction_type 
        

        


        usersContainer.innerHTML += `         <tr >
        <td>${fullname}</td>

        <td>
           $ ${amount} - ${transactionType}
        </td>

        <td><a href="${ENDPOINT}/admin/deleteName.php?id=${nameId}" class="text-danger">Delete name </a></td>

   
    </tr>`
    });
}else{
    console.log(userList.length)
}

})
