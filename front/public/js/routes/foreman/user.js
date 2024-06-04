

import { parentDirectoryName } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookies.js";
import { createNavigation } from "./navbar.js";
import { Getusers } from "./userList.js";

// ValidateLogin()
const uid = GetCookie("admin_u_id")
const usersContainer = document.getElementById("usersContainer");

createNavigation()


const userS = await Getusers()
userS.forEach(userDetail =>{
    const userList = new Array(JSON.stringify(userDetail.usersDetails))
if(userList.length > 0){
    userList.forEach(user => {
        const userArray = new Array(JSON.parse(user))
       
        // const userId =  new Array(JSON.parse(JSON.stringify(userDetail)))[0].userId

        const username = userArray[0].username 
        const fullname = userArray[0].first_name 
        const lastname = userArray[0].last_name
        const zipCode = userArray[0].zip_code 
        const country = userArray[0].country
        const state = userArray[0].state 
        const address = userArray[0].address
        const phonenumber = userArray[0].phonenumber
        const email = userArray[0].email
        const dateJoined = userArray[0].date_updated
        const city = userArray[0].city
        const currentBalance = userArray[0].current_balance
        

        // let Status

        // if(status === "completed"){
        //     Status = `<button class="btn text-success">Approved</button>
        //     <form  method="POST" action="../../backend/admin/rejectuser.php">
        //     <input type="hidden" value="${userId}" name="userID">
        //     <input type="hidden" value="${userID}" name="userID">
        //     <button class="btn btn-danger " style="padding: 10px; color:3333">Reject</button>
        // </form>`
        // }else if(status === "rejected"){
        //     Status = `
        //     <button class="btn text-danger">Rejected</button>
        //     <form method="POST" action="../../backend/admin/approveFunding.php">
        //     <input type="hidden" value="${userId}" name="userID">
        //     <input type="hidden" value="${userID}" name="userID">
        //     <button class="btn  btn-success" style="padding: 10px;">Approve</button>
        // </form>`
        // }else{
        //     Status = ` <form method="POST" action="../../backend/admin/approveFunding.php">
        //     <input type="hidden" value="${userId}" name="userID">
        //     <input type="hidden" value="${userID}" name="userID">
        //     <button class="btn  btn-success" style="padding: 10px;">Approve</button>
        // </form>
        // <form  method="POST" action="../../backend/admin/rejectuser.php">
        //     <input type="hidden" value="${userId}" name="userID">
        //     <input type="hidden" value="${userID}" name="userID">
        //     <button class="btn btn-danger " style="padding: 10px; color:3333">Reject</button>
        // </form>`
        // }

        usersContainer.innerHTML += `         <tr >
        <td>${formatTimestamp(dateJoined)}</td>

        <td>
            <div>${fullname}</div>
            <div>@${username}</div>
            <div> Account Balance: <br/><span class="text-success">$ ${currentBalance} </span></div>
        </td>

        <td>${email}</td>
        <td>${phonenumber}</td>
        <td>
            ${address}, ${state}, ${country}. ${zipCode}
        </td>
        <td>
        <a href="${parentDirectoryName}/foreman/fundUser?u_id=${username}"> Fund User </a>
        </td>1
    </tr>`
    });
}else{
    console.log(userList.length)
}

})
