import { ENDPOINT, parentDirectoryName } from "../constants.js";
import { GetCookie } from "../setCookies.js";
import { createNavigation } from "./navbar.js";
import { GetSiteData } from "./siteData.js";

// ValidateLogin()
const uid = GetCookie("admin_u_id")

createNavigation()



const settingsForm = document.getElementById("settingsForm")
const btc_wallet = document.getElementById("btc_wallet") 
settingsForm.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(settingsForm)
    fetch(`${ENDPOINT}/admin/updateSettings.php`, {
        method:"POST",
        body: formData
    }).then(res => res.json())
    .then(data=>{
        alert(data.message)
        if(data.status === "success"){
            window.location.reload()
        }
    })
})


const SiteInfo = await GetSiteData()

const eth_wallet = document.getElementById("eth_wallet");
const b_wallet = document.getElementById("b_wallet")
const contact_address = document.getElementById("contact_address")
const phone = document.getElementById("phonenumber")

// if(SiteInfo.length > 0){
    eth_wallet.value = SiteInfo.eth 
    b_wallet.value = SiteInfo.btc
    contact_address.value = SiteInfo.office  
    phone.value = SiteInfo.phone
// }

