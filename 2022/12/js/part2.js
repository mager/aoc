const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

const inputs = data.split("\n");

function findShortestPath(startPos, grid) {
    let queue = [new Position(startPos.top, startPos.left, [], "Start")];

    while (queue.length > 0) {
        const currentPos = queue.shift();
        const directions = ["Up", "Down", "Left", "Right"];

        for (const dir of directions) {
            let newPos = exploreNeighbour(currentPos, dir, grid);
            if (newPos.status === "End") {
                return newPos.path;
            } else if (newPos.status === "Valid") {
                grid[newPos.top][newPos.left].visited = true;
                queue.push(newPos);
            }
        }
    }

    return false;
}

function exploreNeighbour(currentPos, direction, grid) {
    let newPath = currentPos.path.slice();
    newPath.push(direction);

    let top = currentPos.top;
    let left = currentPos.left;

    switch (direction) {
        case "Up":
            top--;
            break;
        case "Down":
            top++;
            break;
        case "Left":
            left--;
            break;
        case "Right":
            left++;
            break;
    }

    let newPos = new Position(top, left, newPath);
    newPos.setStatus(currentPos, newPos, grid);

    return newPos;
}

class Position {
    constructor(top, left, path, status = "Unknown") {
        this.top = top;
        this.left = left;
        this.path = path;
        this.status = status;
    }
    setStatus(currentPos, newPos, grid) {
        const [gridWidth, gridHeight] = [grid[0].length, grid.length];
        if (
            newPos.left < 0 ||
            newPos.left >= gridWidth ||
            newPos.top < 0 ||
            newPos.top >= gridHeight
        ) {
            this.status = "Invalid";
        } else if (
            grid[newPos.top][newPos.left].char === 97 &&
            grid[currentPos.top][currentPos.left].char - grid[newPos.top][newPos.left].char === 1
        ) {
            this.status = "End";
        } else if (
            grid[newPos.top][newPos.left].visited ||
            grid[currentPos.top][currentPos.left].char - grid[newPos.top][newPos.left].char > 1
        ) {
            this.status = "Blocked";
        } else {
            this.status = "Valid";
        }
    }
}

class Node {
    constructor(char) {
        this.char = char.charCodeAt();
        this.visited = false;
    }
}

let grid = [];

let startPos = {};

for (let i = 0; i < inputs.length; i++) {
    grid[i] = [];
    for (let j = 0; j < inputs[i].length; j++) {
        let char = inputs[i][j];
        if (char === "S") {
            char = "a";
        } else if (char === "E") {
            startPos = { top: i, left: j };
            char = "z";
        }
        grid[i][j] = new Node(char);
    }
}

console.log(findShortestPath(startPos, grid).length);