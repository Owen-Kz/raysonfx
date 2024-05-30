import { ENDPOINT, getURL, parentDirectoryName } from "../constants.js";
import { SendEmail } from "../email.js";


const username = document.getElementById("username")

const RegistrationForm = document.getElementById("signupForm")

const email = document.getElementById("email")
const password = document.getElementById("password")
window.location.href = `${parentDirectoryName}/foreman/login`

RegistrationForm.addEventListener("submit", function (e) {
    e.preventDefault()
    VerifySecondLevelSubmission()
})


async function VerifySecondLevelSubmission() {

    const user = {
        email: email.value,
        username: username.value,
        password: password.value,
    }


    REGISTER(user)

}



// Final function to register the user 
function REGISTER(user) {
    fetch(`${ENDPOINT}/admin/createAdminAccount.php`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/JSON"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                // window.location.href = "WE SENT EMAIL VERIFICATION PAGE"
                console.log(data.message)
                window.location.href = `../login`
            } else {
                alert(data.message)
                console.log(data.message)
            }
        })
}



