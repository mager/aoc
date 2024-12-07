const path = require('path');
const fs = require('fs');

function parseInput(input) {
    return input.trim().split('\n');
}
// Direction vectors for all 8 directions
const directions = [
    [0, 1],   // right
    [0, -1],  // left
    [1, 0],   // down
    [-1, 0],  // up
    [1, 1],   // diagonal down-right
    [-1, -1], // diagonal up-left
    [1, -1],  // diagonal down-left
    [-1, 1]   // diagonal up-right
];

function countXMAS(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function checkWord(row, col, dRow, dCol) {
        const word = "XMAS";
        for (let i = 0; i < word.length; i++) {
            const newRow = row + (dRow * i);
            const newCol = col + (dCol * i);

            if (newRow < 0 || newRow >= rows ||
                newCol < 0 || newCol >= cols ||
                grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Check each cell as a potential starting point
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Only check if current cell is 'X'
            if (grid[row][col] === 'X') {
                // Check all directions
                for (const [dRow, dCol] of directions) {
                    if (checkWord(row, col, dRow, dCol)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

// Helper function to check grid bounds
function isInBounds(grid, row, col) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

function part1() {
    const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
    const grid = parseInput(input);
    const result = countXMAS(grid);
    console.log(result);
}

part1();
