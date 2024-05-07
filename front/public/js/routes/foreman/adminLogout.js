// import { ENDPOINT, parentDirectoryName } from "./constants.js";
// import { DeleteCookie } from "./setCookies.js";

import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { DeleteCookie } from "../setCookies.js"

// DeleteCookie("userData")
// // DeleteCookie("PHPSESSID")

function logout(){

DeleteCookie("admin_u_id")

    fetch(`${ENDPOINT}/admin/logout.php`, {
        method:"GET"
    }).then(res => res.json())
    .then(data=>{
        if(data){
            console.log(data)
        }
        window.location.href = `${parentDirectoryName}/foreman/login`
    })
}
logout()

