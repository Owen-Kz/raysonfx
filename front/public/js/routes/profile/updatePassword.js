import { ENDPOINT } from "../constants.js"
import { GetCookie } from "../setCookies.js"
import { ValidateLogin } from "../vaidateLogin.js"
ValidateLogin()
const passwordUpdateForm = document.getElementById("passwordResetForm")
const user_id = GetCookie("u_id")
passwordUpdateForm.addEventListener("submit", function(e){
    e.preventDefault()

    const passwordData = {
        old_pass: old_pass.value,
        new_pass: new_pass.value,
        user_id: user_id
    }

    fetch(`${ENDPOINT}/password/new.php`, {
        method: "POST",
        body: JSON.stringify(passwordData),
        headers: {
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        alert(data.message)
    })
})