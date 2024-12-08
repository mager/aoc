const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const grid = data.split('\n');

const part1 = new Set(); // Use a Set to track distinct positions

const width = grid[0].length;
const height = grid.length;

// Initial position of the guard
let guardX = 0; // Starting x position
let guardY = 0; // Starting y position
let direction = 'N'; // Initial direction (North)

// Function to get the next position based on the current direction
const getNextPosition = (x, y, dir) => {
    switch (dir) {
        case 'N': return [x, y - 1];
        case 'E': return [x + 1, y];
        case 'S': return [x, y + 1];
        case 'W': return [x - 1, y];
    }
};

// Function to turn right
const turnRight = (dir) => {
    switch (dir) {
        case 'N': return 'E';
        case 'E': return 'S';
        case 'S': return 'W';
        case 'W': return 'N';
    }
};

// Find the starting position of the guard
for (let y = 0; y < height; y++) {
    const x = grid[y].indexOf('^');
    if (x !== -1) {
        guardX = x; // Set starting x position
        guardY = y; // Set starting y position
        break; // Exit loop once found
    }
}

// Simulate the guard's movement
while (true) {
    // Mark the current position as visited
    part1.add(`${guardX},${guardY}`);

    // Log the current position and direction of the guard
    console.log(`Guard is at (${guardX}, ${guardY}) facing ${direction}`);

    // Get the next position based on the current direction
    const [nextX, nextY] = getNextPosition(guardX, guardY, direction);
    // Log the next position
    console.log(`Next position will be (${nextX}, ${nextY})`);

    // Check if the next position is within bounds
    if (nextY < 0 || nextY >= height || nextX < 0 || nextX >= width) {
        break; // Out of bounds, stop the simulation
    }

    // Check for obstruction
    if (grid[nextY][nextX] === '#') {
        // Turn right if there's an obstruction
        direction = turnRight(direction);
    } else {
        // Move forward
        guardX = nextX;
        guardY = nextY;
    }
}

// The number of distinct cells visited
console.log(part1.size);

const part2 = new Set();

