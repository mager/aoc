// Credit to derfritz

const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const rows = data.split('\n');
const controlMap = {};

rows.filter(row => row.includes('|'))
    .map(row => row.split('|').map(Number))
    .forEach(([key, value]) => (controlMap[key] ??= []).push(value));

const instructions = rows
    .filter(row => row.includes(','))
    .map(row => row.split(',').map(Number));

const sortByInstructions = (a, b) => {
    if (controlMap[a]?.includes(b)) return -1;
    if (controlMap[b]?.includes(a)) return 1;
    return 0;
}
const isValid = (instructions) => {
    const sortedInstructions = [...instructions].sort(sortByInstructions);
    return sortedInstructions.join(',') === instructions.join(',');
}

const counts = instructions.reduce((acc, instruction) => {
    const midIndex = Math.floor(instruction.length / 2);
    if (isValid(instruction)) {
        acc.validCount += instruction[midIndex];
    } else {
        acc.repairCount += instruction.sort(sortByInstructions)[midIndex];
    }
    return acc;
}, { validCount: 0, repairCount: 0 });

console.log('[D5P1]', counts.validCount);
console.log('[D5P2]', counts.repairCount);