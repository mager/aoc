const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const inputs = data.split("\n");
const numbers = [];

for (let i = 0; i < inputs.length; i++) {
    // For example, each input could look like `ew3kkfjd8ee, dddjsje2i2j3k4j33k, kdjskdj8snkdns`
    const input = inputs[i];

    // Split the input into an array of characters
    const characters = input.split('');

    // Find the first and last digit in the string
    let firstDigit = null;
    let lastDigit = null;

    for (let j = 0; j < characters.length; j++) {
        const character = characters[j];

        // Check if the character is a digit
        if (!isNaN(character)) {
            // If the first digit hasn't been set yet, set it
            if (firstDigit === null) {
                firstDigit = character;
            }

            // Set the last digit
            lastDigit = character;
        }
    }

    // Combine the first and last digit into a number
    const str = firstDigit.toString() + lastDigit.toString();
    const num = parseInt(str);

    // Add the number to the numbers array
    numbers.push(num);
}

// Sum up all the numbers
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    sum += number;
}

console.log(sum);
