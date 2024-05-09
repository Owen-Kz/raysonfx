async function Price() {
    // Generate a random number between 0 and 1
    const randomFraction = Math.random();
    
    // Scale the random number to the range 200 to 1000
    const randomPrice = 200000 + randomFraction * (1000000 - 200000);
    
    // Round the result to get an integer value
    return Math.round(randomPrice);
}

// usage:

async function getFruit() {
    // Define an array with the words "Banana" and "Orange"
    const fruits = ["Deposited", "Withdrawn", "Invested"];
  
    // Generate a random index (0 or 1)
    const randomIndex = Math.floor(Math.random() * fruits.length);
  
    // Return the word at the random index
    return fruits[randomIndex];
  }
  

  const withdrawals = [
    { username: names(), amount: Price(), transType: getFruit()},
    // Add more withdrawal data as needed
];
