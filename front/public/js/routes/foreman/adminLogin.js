import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { GetCookie, SetCookies, daysToKeep } from "../setCookies.js"

const loginForm = document.getElementById("loginForm")
const username = document.getElementById("username")
const password = document.getElementById("password")

const userLoggedin = GetCookie("admin_u_id")

if(userLoggedin){

}{
    loginForm.addEventListener("submit", function(e){
        e.preventDefault()
        const loginData = {
            username: username.value,
            password: password.value
        }
    
        fetch(`${ENDPOINT}/admin/loginAdmin.php`, {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-type" : "applcation/JSON"
            }
        }).then(res => res.json())
        .then(data =>{
                if(data.status == "success"){
                    const userDetails = data.adminData
                    const userID = userDetails.id
                    SetCookies("admin_u_id", userID, daysToKeep)
                    alert(data.message)
                    window.location.href = `${parentDirectoryName}/foreman/settings`
                }else{
                    alert(data.message)            
                }
        
        })
    })
}
