import { ENDPOINT } from "../constants.js"
import { GetCookie } from "../setCookies.js"

const withdrawForm = document.getElementById("withdrawForm")
const gateway = document.getElementById("gateway")
const walletAddress = document.getElementById("walletAddress")
const amount = document.getElementById("amount")
const user_id = GetCookie("u_id")

withdrawForm.addEventListener("submit", function(e){
    e.preventDefault()
    const walletGateway = (gateway.value === "1000") ? "BTC" : "ETH";

    const withdrawalData = {
        walletAddress: walletAddress.value,
        gateway:walletGateway,
        amount: amount.value,
        user_id: user_id,
    }

    fetch(`${ENDPOINT}/admin/withdrawFund.php`, {
        method:"POST",
        body: JSON.stringify(withdrawalData),
        headers: {
            "Content-type" : "applcation/JSON"
        }
    }).then(res => res.json())
    .then(data =>{
    
        alert(data.message)
    })
})