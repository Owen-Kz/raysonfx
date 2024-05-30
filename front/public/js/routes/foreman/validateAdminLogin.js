import { ENDPOINT, getURL, parentDirectoryName } from "../constants.js";
import { GetCookie } from "../setCookies.js";


const userID = GetCookie("admin_u_id")
let userEmail,  userName


function VAlidateAdmin(){
    if(userID){
        fetch(`${ENDPOINT}/admin/adminData.php?uid=${userID}`, {
            method: "GET",
        }).then(res => res.json())
        .then(data => {
            if(data){
                if(data.status === "success"){
                    const user = data.user

                    userEmail = user.email
    
                    userName = user.username

                }else{
                    alert("An Error Occured")
                    console.log(data.message)
                }
            }else{
                console.log("NO DATA AVAILABLE")
            }
        })
    }else{
        window.location.href = `${parentDirectoryName}/foreman/login`
    }
}


export {
    VAlidateAdmin
}