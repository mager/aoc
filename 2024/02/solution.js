const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const inputs = data.split("\n");

// Part 1
let safeReports = 0;

function isSequenceSafe(levels) {
    let allInc = true;
    let allDec = true;
    let validDiff = true;

    for (let i = 1; i < levels.length; i++) {
        const diff = Math.abs(levels[i] - levels[i - 1]);

        if (diff < 1 || diff > 3) {
            validDiff = false;
            break;
        }

        if (levels[i] <= levels[i - 1]) allInc = false;
        if (levels[i] >= levels[i - 1]) allDec = false;
    }

    return (allInc || allDec) && validDiff;
}

inputs.forEach((report) => {
    const levels = report.split(' ').map(Number);
    if (isSequenceSafe(levels)) safeReports++;
});

console.log('\nTotal safe reports:', safeReports);

// Part 2 - Allow one bad level
let safeWithRemovalReports = 0;
inputs.forEach((report) => {
    const levels = report.split(' ').map(Number);

    for (let skipIndex = 0; skipIndex < levels.length; skipIndex++) {
        const modifiedLevels = levels.filter((_, i) => i !== skipIndex);

        if (isSequenceSafe(modifiedLevels)) {
            safeWithRemovalReports++;
            break;
        }
    }
});
console.log('\nTotal reports that can be made safe by removing one number:', safeWithRemovalReports);