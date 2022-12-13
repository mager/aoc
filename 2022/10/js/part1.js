const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

const inputs = data.split("\n");

let cycle = 1, sum = 0, x = 1;

for (const line of inputs) {
    const loops = line.startsWith("addx") ? 2 : 1;
    for (let i = 0; i < loops; i++) {
        if ((cycle - 20) % 40 === 0) {
            sum += cycle * x;
        }
        cycle++;
    }
    x += loops === 2 ? +line.split(" ")[1] : 0;
}

console.log(sum);