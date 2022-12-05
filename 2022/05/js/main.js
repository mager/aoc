const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');

const initialStacks = [];

let [input_stacks, input_proceedure] = data
    .toString()
    .trimEnd()
    .split("\n\n")
    .map((part) => part.split("\n"));

console.log({ input_stacks, input_proceedure });
