const path = require('path');
const fs = require('fs');

// Constants
const DIRECTIONS = [
    [0, 1], [0, -1], [1, 0], [-1, 0]
];

// Helper functions
function isValidPosition(x, y, width, height) {
    return x >= 0 && x < width && y >= 0 && y < height;
}

function findRegion(start, data, plants, width, height) {
    const [startX, startY] = start;
    const region = {
        name: data[startY][startX],
        path: [[startX, startY]]
    };

    const queue = [[startX, startY]];
    plants.delete(`${startX},${startY}`);

    while (queue.length > 0) {
        const [currentX, currentY] = queue.shift();

        for (const [dx, dy] of DIRECTIONS) {
            const nextX = currentX + dx;
            const nextY = currentY + dy;
            const posKey = `${nextX},${nextY}`;

            if (isValidPosition(nextX, nextY, width, height) &&
                data[nextY][nextX] === region.name &&
                plants.has(posKey)) {
                plants.delete(posKey);
                region.path.push([nextX, nextY]);
                queue.push([nextX, nextY]);
            }
        }
    }
    return region;
}

function calculateRegionScore(region, data, width, height) {
    const area = region.path.length;
    let totalPerimeter = 0;

    for (const [x, y] of region.path) {
        let plantPerimeter = 0;
        for (const [dx, dy] of DIRECTIONS) {
            const nextX = x + dx;
            const nextY = y + dy;
            if (!isValidPosition(nextX, nextY, width, height) ||
                data[nextY][nextX] !== region.name) {
                plantPerimeter++;
            }
        }
        totalPerimeter += plantPerimeter;
    }

    return area * totalPerimeter;
}

// Main execution
const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\n');
const plants = new Set();
const regions = [];
const width = data[0].length;
const height = data.length;

// Initialize plants set
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        plants.add(`${x},${y}`);
    }
}

// Find all regions
while (plants.size > 0) {
    const start = [...plants][0].split(',').map(Number);
    const region = findRegion(start, data, plants, width, height);
    console.log(region)
    regions.push(region);
}

// Calculate result
const result = regions.reduce((sum, region) =>
    sum + calculateRegionScore(region, data, width, height), 0);

console.log(result);