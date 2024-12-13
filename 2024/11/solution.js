const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\n');

const list = data[0].split(' ');
const stones = new Map();

list.forEach(stone => {
    stones.set(stone, (stones.get(stone) || 0) + 1);
});

function simulateBlinks(iterations) {
    const stonesState = new Map(stones);

    for (let i = 0; i < iterations; i++) {
        const currentState = new Map(stonesState);

        if (stonesState.has('0')) {
            const zeroCount = stonesState.get('0');
            stonesState.set('1', (stonesState.get('1') || 0) + zeroCount);
            stonesState.set('0', 0);
        }

        for (const [key, count] of currentState) {
            if (key === '0' || count === 0) continue;

            if (key.length % 2 === 0) {
                const midIdx = key.length / 2;
                const leftStone = key.substring(0, midIdx);
                const rightStone = key.substring(midIdx);

                stonesState.set(leftStone, (stonesState.get(leftStone) || 0) + count);
                stonesState.set(rightStone, (stonesState.get(rightStone) || 0) + count);
                stonesState.set(key, stonesState.get(key) - count);
            } else {
                const newKey = String(Number(key) * 2024);
                stonesState.set(key, stonesState.get(key) - count);
                stonesState.set(newKey, (stonesState.get(newKey) || 0) + count);
            }
        }
    }

    return Array.from(stonesState.values()).reduce((a, c) => a + c, 0);
}

console.log('Part 1:', simulateBlinks(25));
console.log('Part 2:', simulateBlinks(75));