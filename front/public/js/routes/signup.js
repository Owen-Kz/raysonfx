import { ENDPOINT } from "./constants.js";
import { SendEmail } from "./email.js";
import { GetCookie, SetCookies, hoursToKeep } from "./setCookies.js";

const userData = GetCookie("userData")

const RegistrationForm = document.getElementById("signupForm")
const RegistrationForm2 = document.getElementById("signupForm2")

const email = document.getElementById("email")
const first_name = document.getElementById("first_name")
const country = document.getElementById("country")
const state = document.getElementById("state")




if(RegistrationForm){
    RegistrationForm.addEventListener("submit", function(e){
        e.preventDefault()
        SubmitFirstREG()
    })


    function SubmitFirstREG(){
        const FirstRegData ={
            email: email.value,
            username: username.value,
            first_name: first_name.value,
            last_name: last_name.value,
            password: password.value,
        }
        InitializeSignup(FirstRegData)
    }
    
    
    
    function InitializeSignup(FirstRegData){

        SetCookies("userData", JSON.stringify(FirstRegData), hoursToKeep)
    }
}




if(RegistrationForm2){
    RegistrationForm2.addEventListener("submit", function(e){
        e.preventDefault()
        VerifySecondLevelSubmission()
    })
}

async function VerifySecondLevelSubmission(){
    if(userData){
        const exisitingUserData = JSON.parse(userData)

        const userEmail = exisitingUserData.email
 
        if(userEmail != ""){
            const user = {
                username: exisitingUserData.username,
                first_name: exisitingUserData.first_name,
                last_name: exisitingUserData.last_name,
                email: exisitingUserData.email,
                country: country.value,
                state:  state.value,
                address: address.value,
                city: city.value,
                phonenumber: phonenumber.value,
                zipCode: zipCode.value,
                password: exisitingUserData.password
            }
        
            SetCookies("userData", JSON.stringify(user), hoursToKeep)

            const DateOJ = new Date().getFullYear()

          const FormDataValid= {
                receiverEmail: exisitingUserData.email,
                Year: DateOJ,
                recipientName: exisitingUserData.first_name,
                subject: `Welcome to AlphaforexLyfe`,
                message:  `
                            <div><img src="https://res.cloudinary.com/dll8awuig/image/upload/v1710946645/pf5b8n55pol5kvkpimfa.jpg" width=100% alt=www.alphaforexlyfe.com></div>
                            <h1>Hi there, ${first_name}</h1>
                            <h2>Thanks For Joining us,</h2>
                            <p>Please proceed to, verify your email, make a deposit and start earning.</p>
                            `,
            }

            const newUserData = GetCookie("userData")
    
            REGISTER(newUserData, FormDataValid)
            
        }
    }
}



// Final function to register the user 
function REGISTER(user, FormDataValid){
    fetch(`${ENDPOINT}/signup.php`, {
        method:"POST",
        body: user,
        headers: {
            "Content-type" : "application/JSON"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status === "success"){
            // window.location.href = "WE SENT EMAIL VERIFICATION PAGE"
            console.log(data.message)
            SendEmail(FormDataValid);
            DeleteCookie("userData");
        }else{
            alert(data.message)
            console.log(data.message)
        }
    })
}



