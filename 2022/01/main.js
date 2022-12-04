const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');

// Convert the individual lines of each group to Numbers and tally.
const elves = data
    .split('\n\n')
    .map(group => group
        .split('\n')
        .map(group => Number(group))
        .reduce((total, calories) => total + calories)
    );

console.log(`Elf with the highest value: ${Math.max(...elves)}`);

// Find the top three elves and sum their values.
const topThree = elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, calories) => total + calories);

console.log(`Top three elves: ${topThree}`);