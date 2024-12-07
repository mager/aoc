// Credit to derfritz

const path = require('path');

function day4() {

    const fs = require('fs');
    const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

    const matrix = input.split('\n').map(row => row.split(''));

    let pt1Count = 0;
    let pt2Count = 0;

    const charAt = (i, j) => (matrix[i] && matrix[i][j]) ? matrix[i][j] : '';

    const xmasFoundAt = (i, j) => {

        if (charAt(i, j) !== 'X') return 0;

        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

        return directions.map(([dx, dy]) =>
            charAt(i, j) +
            charAt(i + dx, j + dy) +
            charAt(i + 2 * dx, j + 2 * dy) +
            charAt(i + 3 * dx, j + 3 * dy)
        ).filter(s => s === 'XMAS').length;
    }

    const xmasAxisFoundAt = (i, j) => {

        if (charAt(i, j) !== 'A') return 0;

        const xmasAxis1 = charAt(i - 1, j - 1) + charAt(i, j) + charAt(i + 1, j + 1);
        const xmasAxis2 = charAt(i - 1, j + 1) + charAt(i, j) + charAt(i + 1, j - 1);

        return ((xmasAxis1 === 'MAS' || xmasAxis1 === 'SAM') &&
            (xmasAxis2 === 'MAS' || xmasAxis2 === 'SAM')) ? 1 : 0;
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            pt1Count += xmasFoundAt(i, j);
            pt2Count += xmasAxisFoundAt(i, j);
        }
    }
    console.log('[D4P1]', pt1Count);
    console.log('[D4P2]', pt2Count);
}

day4();