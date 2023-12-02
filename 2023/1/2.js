const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

let p1 = 0;
let p2 = 0;

data.split('\n').forEach((line) => {
    const p1Digits = [];
    const p2Digits = [];

    for (let i = 0; i < line.length; i++) {
        const c = line[i];

        if (c.match(/\d/)) {
            p1Digits.push(c);
            p2Digits.push(c);
        }

        ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].forEach((val, d) => {
            if (line.slice(i).startsWith(val)) {
                p2Digits.push(String(d + 1));
            }
        });
    }

    p1 += parseInt(p1Digits[0] + p1Digits[p1Digits.length - 1], 10);
    p2 += parseInt(p2Digits[0] + p2Digits[p2Digits.length - 1], 10);
});

console.log(p1);
console.log(p2);
