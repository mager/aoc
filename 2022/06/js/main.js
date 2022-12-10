const path = require('path');
const fs = require('fs');

const stream = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
const chars = stream.split('');

const findMarkerInStream = (markerLength) => {
    let start = 0;
    let end = markerLength;
    while (true) {
        const marker = chars.slice(start, end);
        const check = new Set(marker).size === marker.length;
        if (check) break;
        start++;
        end++
    }
    return end;
}

const part1 = findMarkerInStream(4);
console.log(part1);

const part2 = findMarkerInStream(14);
console.log(part2);