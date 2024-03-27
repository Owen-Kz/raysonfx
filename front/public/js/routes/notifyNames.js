import { names } from "./names.js";

// Sample data of withdrawals (username and amount)
const withdrawals = [
    { username: names(), amount: generateRandomPrice(), transType: "Withdrawn" },
    { username: names(), amount: generateRandomPrice(),  transType: "Deposited" },
    { username: names(), amount: generateRandomPrice(),  transType: "Withdrawn" },
    // Add more withdrawal data as needed
];

async function generateRandomPrice() {
    // Generate a random number between 0 and 1
    const randomFraction = Math.random();
    
    // Scale the random number to the range 200 to 1000
    const randomPrice = 200 + randomFraction * (1000 - 200);
    
    // Round the result to get an integer value
    return Math.round(randomPrice);
}

// usage:
// const randomPrice = generateRandomPrice();

let currentIndex = 0;

// Function to display the next withdrawal
const popupContent = document.getElementById("popupContent");

async function showNextWithdrawal() {
	
    if (currentIndex >= withdrawals.length) {
        currentIndex = 0; // Reset index if reached end
    }
	const AMOUNT = await generateRandomPrice()

    const withdrawal = withdrawals[currentIndex];
   
    popupContent.innerHTML = `<h2>${names()} ${withdrawal.transType}: </h2><p>$${AMOUNT} USD</p>`;
    
    // Increment index for the next withdrawal
    currentIndex++;
}

// Show the first withdrawal
// showNextWithdrawal();

// Continuous display of withdrawals
setInterval(showNextWithdrawal,3100); 