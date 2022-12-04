const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input/4.txt'), 'utf-8');


const mapped = data
    .split('\n')
    .map(line => {
        // Convert a pair of ranged numbers to a list of arrays of numbers
        // Example input: '3-5,4-7'
        // Example output [[3, 4, 5], [4, 5, 6, 7]]
        const ranges = line
            .split(',')
            .map(range => {
                const [start, end] = range.split('-');
                return Array.from({ length: end - start + 1 }, (_, i) => i + Number(start));
            }
            );

        return ranges;
    });

let fullyIntersecting = 0;

// Count the number of times that each range of numbers fully includes the other
mapped.forEach((range, i) => {
    // Check if range[0] fully includes range[1] and vice versa
    if (range[0].every(num => range[1].includes(num)) || range[1].every(num => range[0].includes(num))) {
        fullyIntersecting++;
    }
});

console.log(`Fully intersecting: ${fullyIntersecting}`);

// Find the number of ranges that just overlap

let partialIntersecting = 0;

// Count the number of times that each range of numbers fully includes the other
mapped.forEach((range, i) => {
    if (range[0].some(num => range[1].includes(num)) || range[1].some(num => range[0].includes(num))) {
        partialIntersecting++;
    }
});

console.log(`Partial intersecting: ${partialIntersecting}`);
