import { ENDPOINT, GetParameters, parentDirectoryName } from "../constants.js"
import { GetCookie } from "../setCookies.js"
import { createNavigation } from "./navbar.js"
createNavigation()
const fundUserForm = document.getElementById("fundUserForm")

const AdminLoggedIn = GetCookie("admin_u_id")
const currentLocationURL = window.location.href
const amount = document.getElementById("amount")
const trans_type = document.getElementById("trans_type")
const username_placeholder  = document.getElementById("username_placeholder")
const username = GetParameters(currentLocationURL).get("u_id")

if(AdminLoggedIn){
    username_placeholder.value = username
    fundUserForm.addEventListener("submit", function(e){
        e.preventDefault()
        const formBody = {
            username: username,
            amount: amount.value,
            transactionType: trans_type.value,
        }
        fetch(`${ENDPOINT}/admin/fundUser.php`, {
            method:"POST", 
            body: JSON.stringify(formBody),
            headers: {
                "Content-type" : "application/JSON"
            }
        }).then(res => res.json())
        .then(data=>{
            if(data.status === "success"){
                alert(data.message)
                window.location.href = `${parentDirectoryName}/foreman/dashboard`
            }else{
                alert(data.message)
            }
        })
    })
}else{
    window.location.href = `${parentDirectoryName}/foreman/`
}