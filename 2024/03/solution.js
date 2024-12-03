const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');


// Part 1 - Find mul statements, multiply and sum them
const part1 = () => {
    const re = /mul\((\d+),(\d+)\)/g;
    let match;
    let uncorrupted = 0;

    while ((match = re.exec(data)) !== null) {
        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        uncorrupted += (a * b)
    }
    console.log(`Part 1: ${uncorrupted}`);
};

part1();

// Part 2 - Handle don't() and do() functions, which enable and disable processing
const part2 = () => {
    const combinedRegex = /(?:don't\(\)|do\(\)|mul\((\d+),(\d+)\))/g;
    let match;
    let uncorrupted = 0;
    let ignoreMul = false;
    while ((match = combinedRegex.exec(data)) !== null) {
        switch (match[0]) {
            case "don't()":
                ignoreMul = true;
                break;
            case "do()":
                ignoreMul = false;
                break;
            default:
                if (!ignoreMul) {
                    const a = parseInt(match[1], 10);
                    const b = parseInt(match[2], 10);
                    uncorrupted += (a * b);
                }
                break;
        }
    }
    console.log(`Part 2: ${uncorrupted}`);
}

part2();