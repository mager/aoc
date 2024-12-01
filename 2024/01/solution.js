const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const inputs = data.split("\n");

const left = [];
const right = [];
let diff = 0;

inputs
    .forEach(line => {
        const [l, r] = line.split("   ");

        left.push(l);
        right.push(r);
    });

// Sort the lists
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

for (let i = 0; i < left.length; i++) {
    diff += Math.abs(left[i] - right[i]);
}

// Part 1
console.log(diff);

// Part 2
let similarity = 0;
left.forEach(num => {
    const count = right.filter(x => x === num).length;
    if (count > 0) {
        similarity += (num * count)
    }
});
console.log(similarity);