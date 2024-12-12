// Shoutout to niksimon
const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\n');

const width = data[0].length;
const height = data.length;
const antennasByFrequency = {};
const antinodes = new Set();

// Log the dimensions
console.log('Grid dimensions:', { width, height });

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        const frequency = data[i][j];
        if (frequency !== '.') {
            (antennasByFrequency[frequency] ??= []).push({ x: i, y: j });
        }
    }
}
console.log('\nAntennas found by frequency:');
console.log(JSON.stringify(antennasByFrequency, null, 2));

for (const freq in antennasByFrequency) {
    console.log(`\nProcessing frequency: ${freq}`);
    const antennas = antennasByFrequency[freq];

    for (let i = 0; i < antennas.length; i++) {
        const mainAntenna = antennas[i];

        for (let j = 0; j < antennas.length; j++) {
            if (j === i) continue;

            const comparisonAntenna = antennas[j];
            const antinode = {
                x: comparisonAntenna.x - (mainAntenna.x - comparisonAntenna.x),
                y: comparisonAntenna.y - (mainAntenna.y - comparisonAntenna.y)
            };

            console.log(`  Pair ${i},${j}:`);
            console.log(`    Antenna 1: (${mainAntenna.x}, ${mainAntenna.y})`);
            console.log(`    Antenna 2: (${comparisonAntenna.x}, ${comparisonAntenna.y})`);
            console.log(`    Calculated antinode: (${antinode.x}, ${antinode.y})`);

            if (antinode.x >= 0 && antinode.x < width && antinode.y >= 0 && antinode.y < height) {
                antinodes.add(`${antinode.x},${antinode.y}`);
                console.log('    ✓ Antinode is within bounds');
            } else {
                console.log('    ✗ Antinode is out of bounds');
            }
        }
    }
}

console.log('\nFinal antinode count:', antinodes.size);
console.log('Antinode positions:', Array.from(antinodes).sort());