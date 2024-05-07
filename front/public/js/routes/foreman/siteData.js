import { ENDPOINT } from "../constants.js"
const SiteData = []

function GetSiteData() {
    return fetch(`${ENDPOINT}/admin/getSiteSettings.php`, {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            const Phonenumber = data.phonenumber;
            const address = data.address;
            const ethWallet = data.ETHWallet;
            const btcWallet = data.BTCWallet;

            const siteData = {
                phone: Phonenumber,
                btc: btcWallet,
                office: address,
                eth: ethWallet,
            };

            return siteData; // Return the data instead of modifying a global array
        } else {
            throw new Error(data.message);
        }
    });
}

export {
    GetSiteData
}