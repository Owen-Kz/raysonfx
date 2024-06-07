import { ENDPOINT } from "../constants.js"
import { GetCookie } from "../setCookies.js";

const updateDataForm = document.getElementById("updateDataForm");
const firstnameContainer = document.getElementById("firstname")
const lastnameContainer = document.getElementById('lastname')
const addressContainer = document.getElementById("address")
const stateContainer = document.getElementById("state")
const zipContainer = document.getElementById("zip")
const cityContainer = document.getElementById("city")
const countryContainer = document.getElementById("country")
const phonenumberContainer = document.getElementById("phonenumber")
const emailContainer = document.getElementById("email")
const usernameContainer = document.getElementById("username")
const name_container = document.getElementById("name_container")


function updateSettings(firstname, lastname, address, state, zip, city, country, phonenumber, email, username){
  
    firstnameContainer.value = firstname
    lastnameContainer.value = lastname
    addressContainer.value = address
    stateContainer.value = state;
    zipContainer.value = zip
    cityContainer.value = city
    countryContainer.innerText = country
    phonenumberContainer.innerText = phonenumber
    emailContainer.innerText = email
    usernameContainer.innerText = username
    name_container.innerText = `${firstname} ${lastname}`
    
}

if(updateDataForm){

updateDataForm.addEventListener("submit", function(e) {
    e.preventDefault()

    const newUserData = {
        firstname: firstnameContainer.value,
        lastname: lastnameContainer.value,
        address: addressContainer.value,
        state: stateContainer.value,
        zip: zipContainer.value,
        city: cityContainer.value,
        user_id: GetCookie("u_id"),
    }


    fetch(`${ENDPOINT}/account/settings.php`, {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data.status === "success"){
            alert("Data Saved")
            window.location.reload()
        }else{
            alert(data.message)
        }
    })
})
}



export {
    updateSettings
}