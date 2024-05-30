import { ENDPOINT } from "./constants.js";

function SendEmail(formdata){
    const email = formdata.receiverEmail
    const subject = formdata.subject
    const year = formdata.Year
    // const message = formdata.message
    const fullname = formdata.recipientName

    if(formdata.ResetToken){
        fetch(`https://asfischolar.org/api/email/${year}/${email}/${fullname}/${subject}?resetToken=${formdata.ResetToken}`,{
            method: "GET",
        })
        console.log('Password Reset Email Sent')
    }else{
        fetch(`https://asfischolar.org/api/email/${year}/${email}/${fullname}/${subject}`,{
            method: "GET",
        })
        console.log("Email message sent")
    }

   
}


export {
    SendEmail,
}