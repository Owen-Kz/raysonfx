import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { SendEmail } from "../email.js"
import { SetCookies } from "../setCookies.js"


const ResetPasswordForm = document.getElementById("resetPasswordForm")

ResetPasswordForm.addEventListener('submit', function(e){
    e.preventDefault()
    const Year =  new Date().getFullYear()
    const email = document.getElementById("value")
    const ResetEmail = {
        email: email.value,
    }
    fetch(`${ENDPOINT}/password/reset.php`, {
        method:"POST", 
        body: JSON.stringify(ResetEmail),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=> res.json())
    .then(data =>{
        if(data.user === "NO DATA"){
            alert("Account Does not exist, Please check your email and try again");
        }else{
            
            const EmailBody = {
            receiverEmail : data.user,
            subject : data.subject,
            Year: Year,
            recipientName: data.recipientName,
            ResetToken: data.resetToken,
            }
            SendEmail(EmailBody)
            SetCookies("reset_id", data.cookie, "Session")
            alert("A Code has been set to your email address")
            window.location.href = `${parentDirectoryName}/user/password/confirmcode`
        }
    })
})