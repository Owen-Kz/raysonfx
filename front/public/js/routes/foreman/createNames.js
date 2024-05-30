import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { GetCookie } from "../setCookies.js"
import { createNavigation } from "./navbar.js"

const namesForm = document.getElementById("createNamesForm")
const admin = GetCookie("admin_u_id")
createNavigation()
if(admin){
namesForm.addEventListener("submit", function(e){
    e.preventDefault()
    const formBody = {
        fullname: fullname.value,
        transaction_type: transaction_type.value,
        amount: amount.value
    }


    fetch(`${ENDPOINT}/admin/createNames.php?a_id=${admin}`, {
        method:"POST",
        body:JSON.stringify(formBody)
    }).then(res => res.json())
    .then(data =>{
        if(data.status === "success"){
            alert(data.message)
            window.location.href = `${parentDirectoryName}/foreman/names`
        }else{
            alert(data.message)
        }
    })
})
}else{
    window.location.href = "https://raysonfinance.com"
}
