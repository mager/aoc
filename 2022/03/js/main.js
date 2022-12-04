const path = require('path');
const fs = require('fs');


// Create a map with a-zA-Z as keys and the number of times they appear as values.
// Example: { a: 1, b: 2, c: 3, z: 26, A: 27, B: 28, Z: 52 }
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetMap = alphabet
    .split('')
    .reduce((map, letter, index) => {
        map[letter] = index + 1;
        map[letter.toUpperCase()] = index + 27;
        return map;
    }, {});

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

let total = 0;

const rucksacks = data
    .split('\n')
    .map(rucksack => {
        // Split the word into two substrings
        const splitIndex = rucksack.length / 2;
        const firstHalf = rucksack.slice(0, splitIndex);
        const secondHalf = rucksack.slice(splitIndex);

        // Find the common letters between the two substrings
        const commonLetter = firstHalf
            .split('')
            .filter(letter => secondHalf.includes(letter))
            .shift();

        // Find the value in the alphabet map
        const value = alphabetMap[commonLetter];
        total += value;

    });

console.log(`Rucksack total: ${total}`);

let groupedTotal = 0;

// For each group of 3 rucksacks, find the common letter between them
// and sum the value
const groupedRucksacks = data
    .split('\n')
    .map(rucksack => rucksack.split(''))
    .reduce((groups, rucksack, index) => {
        const groupIndex = Math.floor(index / 3);
        groups[groupIndex] = groups[groupIndex] || [];
        groups[groupIndex].push(rucksack);
        return groups;
    }, [])
    .map(group => {
        // Find the common letters between the three substrings
        const commonLetter = group[0]
            .filter(letter => group[1].includes(letter) && group[2].includes(letter))
            .shift();

        // Find the value in the alphabet map
        const value = alphabetMap[commonLetter];
        groupedTotal += value;
    });

console.log(`Grouped rucksack total: ${groupedTotal}`);