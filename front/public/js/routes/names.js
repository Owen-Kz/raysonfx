// Arrays of first names and last names
const firstNames = ["John", "Alice", "Michael", "Emily", "William", "Sophia", "James", "Olivia", "Alexander", "Emma", "Adolf"];
const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "McGregor"];

// Array to store generated names
const generatedNames = [];

// Function to generate a random full name
async function names() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  generatedNames.push(fullName);
  return fullName;
}

export {
    names
}