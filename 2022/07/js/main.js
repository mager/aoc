const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

// Split data onto lines. Remove first line setting base directory.
const lines = data.split('\n');

// Create a store for individual directory sizes.
let directories = [];

function walkDirectory(lines) {
    let inDir = [];
    let depth = 0;

    // Collect lines until directory exited ($ cd ..) to original depth.
    lines.some(line => {
        if (line.substring(0, 4) === '$ cd' && line.substring(0, 7) !== '$ cd ..') depth++;
        if (line.substring(0, 7) === '$ cd ..') {
            if (depth === 0) return true;
            depth--;
        }
        inDir.push(line);
    });

    // Filter directory listing to just files, return filesize portion and tally.
    const size = inDir.map(item => parseInt(item.split(' ')[0])).filter(Number).reduce((a, c) => a + c);
    return size;
}

lines.forEach((line, index, lines) => {
    // When an ls is encountered, send all following lines to walker function (inefficient).
    // Walker function returns cumulative size of all files in this directory and children.
    // Push directory size to directories store.
    if (line.substring(0, 4) === '$ ls') {
        const remainingLines = lines.slice(++index);
        const dirSize = walkDirectory(remainingLines);
        directories.push(dirSize);
    }
});

// Filter directories to all with total size under 100000 and tally.
// Print answer to part one.
const part1 = directories.filter(size => size <= 100000).reduce((a, c) => a + c);
console.log(part1);

// Part 2
const diskSize = 70000000;
const requiredSpace = 30000000;
const usedSpace = directories[0];
const unusedSpace = diskSize - usedSpace;
const extraSpaceNeeded = requiredSpace - unusedSpace;

// Remove root from directories store as we can't delete everything.
directories.shift();

// Filter directories which are candidates for deletion.
const possibleDirs = directories.filter(size => size >= extraSpaceNeeded);

// Find the smallest possible candidate directory.
// Print answer to part two.
const part2 = Math.min(...possibleDirs);
console.log(part2);