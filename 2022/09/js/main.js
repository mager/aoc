const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

const inputs = data.split("\n");

const part1 = new Set();
const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

for (const line of inputs) {
    const [direction, steps] = line.split(" ");
    for(let j = 0; j < steps; j++) {
        const lastPos = {x: head.x, y: head.y};
        switch (direction) {
            case "R":
                head.x++;
                break;
            case "L":
                head.x--;
                break;
            case "U":
                head.y++;
                break;
            case "D":
                head.y--;
                break;
        }
        if(Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {       
            tail.x = lastPos.x;
            tail.y = lastPos.y;
        }
        part1.add(`${tail.x},${tail.y}`);
    }
}

console.log(part1.size);

// Part 2
const part2 = new Set();
const rope = [];
for (let i = 0; i < 10; i++) {
    rope[i] = { x: 0, y: 0 };
}

for (const line of inputs) {
    const [direction, steps] = line.split(" ");
    for (let j = 0; j < steps; j++) {
        switch (direction) {
            case "R":
                rope[0].x++;
                break;
            case "L":
                rope[0].x--;
                break;
            case "U":
                rope[0].y++;
                break;
            case "D":
                rope[0].y--;
                break;
        }
        for (let i = 1; i < 10; i++) {
            const delta = { x: rope[i - 1].x - rope[i].x, y: rope[i - 1].y - rope[i].y };
            const axis = Math.abs(delta.x) > Math.abs(delta.y) ? "x" : "y";
            const axis2 = axis === "x" ? "y" : "x";
            if (Math.abs(delta[axis]) > 1) {
                rope[i][axis] += delta[axis] < 0 ? -1 : 1;
                if (Math.abs(delta[axis2]) > 0) {
                    rope[i][axis2] += delta[axis2] < 0 ? -1 : 1;
                }
            }
        }
        part2.add(`${rope[9].x},${rope[9].y}`);
    }
}

console.log(part2.size);