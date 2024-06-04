import { parentDirectoryName } from "../constants.js";
import { GetSiteData } from "../foreman/siteData.js";
import { GetCookie, SetCookies, hoursToKeep } from "../setCookies.js"

const DepositForm = document.getElementById("depositForm")
const userID = GetCookie("u_id")

const Amount = document.getElementById("amount");
const gateway = document.getElementById("gateway")

const SiteData = await GetSiteData()

let gatewayText 
gateway.addEventListener("change", function(){

if(gateway.value !== ""){

if(gateway.value === "btc"){
    gatewayText = "BTC"
}else if(gateway.value === "eth"){
    gatewayText = "ETH"
}
}else{
    console.log("Gateway Not Set")
}

})


DepositForm.addEventListener("submit", function(e){
    e.preventDefault()
    const TransacttionDetails = {
        user_id : userID,
        amount: Amount.value,
        gateway:gatewayText,
        type :"depositWalletCredit",
    }
    SetCookies("t_rd", JSON.stringify(TransacttionDetails), hoursToKeep)

    window.location.href = `${parentDirectoryName}/user/deposit/manual.html`
})
