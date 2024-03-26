import { ENDPOINT } from "../constants.js"

const updateDataForm = document.getElementById("updateDataForm")

updateDataForm.addEventListener("submit", function(e) {
    e.preventDefault()

    const newUserData = {
        firstname: firstname.value,
        lastname: lastname.value,
        address: address.value,
        state: state.value,
        zip: zip.value,
        city: city.value
    }

    fetch(`${ENDPOINT}/account/settings.php`, {
        method: "POST",
        body: newUserData,
        headers: {
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data.status === "success"){
            window.reload()
        }else{
            alert(data.message)
        }
    })
})