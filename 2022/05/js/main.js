const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

// Ref: https://stackoverflow.com/a/17428705/265508
Array.prototype.transpose = function () {
    return this[0].map((_, i) => this.map((y) => y[i]));
};

let [input_stacks, input_proceedure] = data
    .toString()
    .trimEnd()
    .split("\n\n")
    .map((part) => part.split("\n"));

// Convert to stacks
const part1 = input_stacks
    .map((row) => [...row])
    .transpose()
    .map((row) => row.join("").replace(/\[|\]/g, "").trim())
    .filter((row) => row !== "")
    .map((row) => [...row.slice(0, -1)].reverse());


// Parse out the procedure instrtuctions into an array of [move, from, to]
const proceedure = input_proceedure.map((line) =>
    Array.from(line.matchAll(/\d+/g), (d) => Number.parseInt(d, 10))
);

// Copy part1 stacks
const part2 = part1.map((stack) => [...stack]);

// Apply the proceedure to the stacks
proceedure.forEach(([number, from, to]) => {
    const moved = part1[from - 1].splice(-number, number);
    part1[to - 1].push(...moved.reverse());
});

proceedure.forEach(([number, from, to]) => {
    const moved = part2[from - 1].splice(-number, number);
    part2[to - 1].push(...moved);
});

const part1Result = part1.map((stack) => stack.at(-1)).join("");
const part2Result = part2.map((stack) => stack.at(-1)).join("");
console.log(part1Result);
console.log(part2Result);