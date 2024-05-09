import { getAlertNames } from "./getNames.js";
import { names } from "./names.js";

// Sample data of withdrawals (username and amount)



let currentIndex = 0;

// Function to display the next withdrawal
const popupContent = document.getElementById("popupContent");
if(popupContent){
    
const GetNameNotifications = await getAlertNames()
async function showNextWithdrawal() {

    if (currentIndex >= GetNameNotifications.length) {
        currentIndex = 0; // Reset index if reached end
    }

    const message_ = GetNameNotifications[currentIndex];
    
   
    popupContent.innerHTML = `<h2>${message_.fullname} ${message_.transaction_type}: </h2><p>$ ${ new Number(message_.amount).toLocaleString()} USD</p>`;
            // Move the pop-up into view
        popupContent.style.transform = "translateY(0)"; 
        
        // Wait for 2 seconds before moving it back up
        setTimeout(() => {
            popupContent.style.transform = "translateY(-100%)"; // Move it up completely (out of view)
        }, 3000); // 2000 milliseconds = 2 seconds

    // Increment index for the next withdrawal
    currentIndex++;
	// popupContent.style.transform = "translateY(0)"


}

// Show the first withdrawal
// showNextWithdrawal();

// Continuous display of withdrawals
popupContent.style.transform = "translateY(-10%)"
setInterval(showNextWithdrawal, 4000); 

}