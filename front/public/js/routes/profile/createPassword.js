import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { GetCookie } from "../setCookies.js"

const newPasswordForm = document.getElementById("newPasswordForm")

const newPassword = document.getElementById("newpassword")
const confirm_password = document.getElementById("confirm_password")

const userResetID = GetCookie("reset_id")
newPasswordForm.addEventListener("submit", function(e){
    e.preventDefault()

    const formdata = {
        new_pass: newPassword.value,
        user_id: userResetID
    }

    fetch(`${ENDPOINT}/password/passwordReset.php`, {
        method:"POST",
        body: JSON.stringify(formdata),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data.status === "success"){
            alert(data.message)
            window.location.href = `${parentDirectoryName}/user/login.html`
        }else{
            alert(data.message)
        }
    })
})