import { ENDPOINT, getURL, parentDirectoryName } from "./constants.js";
import { CreatNavigation} from "./navbar.js";
import { updateSettings } from "./profile/settings.js";
import { GetCookie } from "./setCookies.js";

const userID = GetCookie("u_id")
let userEmail, userFullname, userName, AccountBalance, InterestEarned, firstname, lastname, zip, country, state, address, city, phonenumber

const accountBalance = document.getElementById("accountBalance")
const userTHUMB = document.querySelector(".user-info__thumb")
const InterestWallet = document.getElementById("interestWallet")
const emptyBalance = document.getElementById("emptyBalance")
const total_deposit_balance = document.getElementById("total_deposit_balance")


function ValidateLogin(){
    if(userID){
        fetch(`${ENDPOINT}/userData.php?uid=${userID}`, {
            method: "GET",
        }).then(res => res.json())
        .then(data => {
            if(data){
                if(data.status === "success"){
                    const user = data.user

                    userEmail = user.user_email
                    userFullname = user.user_fullname,
                    userName = user.username,
                    AccountBalance = new Number(user.account_balance)
                    InterestEarned  = user.totalInterest

                    firstname = user.firstname
                    lastname = user.lastname
                    zip = user.zip
                    country = user.country
                    state = user.state 
                    city = user.city 
                    phonenumber = user.phonenumber
                    address = user.address
                    


                    if(userTHUMB){
                        user_fullnameContainer.innerText = `${userFullname}`
                        // user_emailContainer.innerText = `${userEmail}`
                        userTHUMB.innerText = `${user.Intitials}`
                    }
                   

                    if(accountBalance){

                        accountBalance.innerText = `${AccountBalance.toFixed(2)}`;
                  
                        InterestWallet.innerText = `${new Number(InterestEarned).toFixed(2)}`;                        
                    }
                    if(total_deposit_balance){
                        total_deposit_balance.innerText = `${AccountBalance.toFixed(2)} USD`
                    }
                    if(emptyBalance){
                        if(AccountBalance > 0){
                            emptyBalance.remove()
                        }
                    }
                    CreatNavigation(AccountBalance.toFixed(2), new Number(InterestEarned).toFixed(2))
                    console.log(getURL())
                    console.log(parentDirectoryName)
                    if(getURL() === `${parentDirectoryName}/user/profile-setting.html`){
                        updateSettings(firstname, lastname, address, state, zip, city, country, phonenumber, userEmail, userName)
                    }

                }else{
                    alert("An Error Occured")
                    console.log(data.message)
                }
            }else{
                console.log("NO DATA AVAILABLE")
            }
        })
    }else{
        window.location.href = `${parentDirectoryName}/user/login.html`
    }
}


export {
    ValidateLogin
}