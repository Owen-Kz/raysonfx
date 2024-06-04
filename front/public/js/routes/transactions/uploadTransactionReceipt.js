import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { GetSiteData } from "../foreman/siteData.js"
import { DeleteCookie, GetCookie } from "../setCookies.js"

console.log("manual")
const FileUploadForm = document.getElementById("file_uploadForm")
const TransactionDetails = GetCookie('t_rd')
const gatewayContent = document.getElementById("gatewayContent")

const header = document.getElementById("walletHeader")

if(TransactionDetails){
const GateWay = JSON.parse(TransactionDetails).gateway
const Details = JSON.parse(TransactionDetails)

const SiteData = await GetSiteData()

if(GateWay === "ETH"){
    header.innerHTML = `<i class="las la-wallet"></i> Crypto Payment (ETHEREUM &amp; USDT ERC20) Payment`
    const ToETH = Details.amount * SiteData.eth_rate

    gatewayContent.innerHTML = `<p class="text-center mt-2">You have requested 
        <b class="text--success">${new Number(Details.amount).toFixed(2)} USD</b> ,
        Please pay <b class="text--success">${ToETH} ETH-USDT </b> for successful payment                     </p>
        <div class="my-4">
            <p><span style="font-family: Montserrat, sans-serif;"><font color="#ffffff">Please Kindly Make Payment To This ETHEREUM &amp;&nbsp; USDT ERC20 Wallet Address:&nbsp;</font></span><font color="#ffffff" face="Montserrat, sans-serif">${SiteData.eth}</font><br></p>
        </div>`;
}else{
    header.innerHTML = `<i class="las la-wallet"></i> Crypto Payment (BTC) Payment`
    const ToBTC = Details.amount * SiteData.btc_rate

     gatewayContent.innerHTML = `
    <p class="text-center mt-2">You have requested 
    <b class="text--success">${new Number(Details.amount).toFixed(2)} USD</b> ,
    Please pay <b class="text--success">${ToBTC} BTC </b> for successful payment
    </p>

        <div class="my-4">
            <p><span style="font-family: Montserrat, sans-serif;"><font color="#ffffff">Please Kindly Make Payment To This BTC Wallet Address:&nbsp;</font></span><font color="#ffffff" face="Montserrat, sans-serif">${SiteData.btc}</font><br></p>
        </div>`
}

FileUploadForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("transaction_details", TransactionDetails);

    fetch(`${ENDPOINT}/uploadReceipt.php`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data){
        if (data.status === "success") {
            console.log(data.message);
            alert(data.message)
            window.location.href = `${parentDirectoryName}/user/dashboard.html`
            DeleteCookie("t_rd")
        } else {
            alert(data.message);
            window.location.href = `${parentDirectoryName}/user/dashboard.html`;
        }
    }else{
        console.log("No Data Available")
    }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Could Not Upload File");
    });
})
}else{
    window.location.href = `${parentDirectoryName}/user/deposit.html`
}