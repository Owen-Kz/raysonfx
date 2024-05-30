function calculatePercentage(number, percentage, numDays) {
    // Get the current date
    let currentDate = new Date();
    currentDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Calculate the percentage of the number
    let result = number;
    const percentPerDay = percentage / numDays;
    // for (let i = 1; i <= numDays; i++) {
        result += (result * percentPerDay) / 100;
        const percentGained = 1 * percentPerDay;
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        const formattedDate = newDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        console.log(`Day ${1}: ${percentGained}% gained. Result: ${result}. New Date: ${formattedDate}`);
    // }
}


export {
    calculatePercentage
}