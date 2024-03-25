import { ENDPOINT } from "./constants.js";

function SendEmail(data){
    fetch(`${ENDPOINT}/sendMail.php`,{
        method: "POST",
        body: JSON.stringify(data),
        header: {
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data =>{
        console.log(data.message)
    })
}


export {
    SendEmail,
}