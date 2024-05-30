import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { GetCookie } from "../setCookies.js"

const codeConfirmation = document.getElementById("codeConfirmation")
const ResetToken = document.getElementById("code")

const ResetId = GetCookie("reset_id")

codeConfirmation.addEventListener("submit", function(e){
    e.preventDefault()

    const confirmationDetails = {
        email: ResetId,
        resetCode:ResetToken.value,

    }
    fetch(`${ENDPOINT}/password/confirmResetCode.php`, {
        method:"POST",
        body: JSON.stringify(confirmationDetails),
        header:{
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.error){
            alert(data.error)
        }else{
            alert(data.success)
            window.location.href = `${parentDirectoryName}/user/password/create`
        }
    })
})