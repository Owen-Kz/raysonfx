import { ENDPOINT } from "./constants.js"




async function getAlertNames(){
    return fetch(`${ENDPOINT}/getNames.php`, {
        method:"POST"
    }).then(res => res.json())
    .then(data => {
        if(data.status === "success"){
            return data.names 
        }else{
            console.log(data.message)
            return []
        }
    })
}

export {
    getAlertNames
}