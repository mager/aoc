// Shout to niksimon
const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\n\n').map(e => e.split("\n"));

let sum = 0;

for (const config of data) {
    const buttonA = config[0].split(': ')[1].split(', ').map(e => +e.split('+')[1]);
    const buttonB = config[1].split(': ')[1].split(', ').map(e => +e.split('+')[1]);
    const prize = config[2].split(': ')[1].split(', ').map(e => +e.split('=')[1]);

    const y = (prize[1] * buttonA[0] - prize[0] * buttonA[1]) / (buttonB[1] * buttonA[0] - buttonB[0] * buttonA[1]);
    const x = (prize[0] - y * buttonB[0]) / buttonA[0];

    if (x % 1 == 0 && y % 1 == 0 && x > 0 && x <= 100 && y <= 100 && y > 0) {
        sum += x * 3 + y;
    }
}

console.log(sum)