import { parentDirectoryName } from "../constants.js";
import { GetSiteData } from "../foreman/siteData.js";
import { GetCookie, SetCookies, hoursToKeep } from "../setCookies.js"

const DepositForm = document.getElementById("depositForm")
const userID = GetCookie("u_id")

const Amount = document.getElementById("amount");
const gateway = document.getElementById("gateway")

const SiteData = await GetSiteData()

let gatewayText 
if(gateway.value === "1000"){
    gatewayText = "BTC"
}else{
    gatewayText = "ETH"
}


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
