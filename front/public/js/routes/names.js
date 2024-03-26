// Arrays of first names and last names
const firstNames = ["John", "Alice", "Michael", "Emily", "William", "Sophia", "James", "Olivia", "Alexander", "Emma"];
const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];

// Array to store generated names
const generatedNames = [];

// Function to generate a random full name
function generateRandomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  generatedNames.push(fullName);
  return fullName;
}

export {
    generateRandomName
}