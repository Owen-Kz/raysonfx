import { names } from "./names.js";

// Sample data of withdrawals (username and amount)
const withdrawals = [
    { username: names(), amount: Price(), transType: getFruit()},
    // Add more withdrawal data as needed
];

async function Price() {
    // Generate a random number between 0 and 1
    const randomFraction = Math.random();
    
    // Scale the random number to the range 200 to 1000
    const randomPrice = 200000 + randomFraction * (1000000 - 200000);
    
    // Round the result to get an integer value
    return Math.round(randomPrice);
}

// usage:
// const randomPrice = Price();
async function getFruit() {
    // Define an array with the words "Banana" and "Orange"
    const fruits = ["Deposited", "Withdrawn", "Invested"];
  
    // Generate a random index (0 or 1)
    const randomIndex = Math.floor(Math.random() * fruits.length);
  
    // Return the word at the random index
    return fruits[randomIndex];
  }
  

let currentIndex = 0;

// Function to display the next withdrawal
const popupContent = document.getElementById("popupContent");



async function showNextWithdrawal() {

    if (currentIndex >= withdrawals.length) {
        currentIndex = 0; // Reset index if reached end
    }
	const AMOUNT = new Number(await Price()).toLocaleString()
    const PERSON = await names()
    const TYPE = await getFruit()

    const withdrawal = withdrawals[currentIndex];
    
   
    popupContent.innerHTML = `<h2>${PERSON} ${TYPE}: </h2><p>$ ${AMOUNT} USD</p>`;
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

