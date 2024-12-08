// Credit to derfritz

const path = require('path');

const directions = {
    up: { x: -1, y: 0, turn: 'right', symbol: '^' },
    right: { x: 0, y: 1, turn: 'down', symbol: '>' },
    down: { x: 1, y: 0, turn: 'left', symbol: 'v' },
    left: { x: 0, y: -1, turn: 'up', symbol: '<' },
}

const copy = (matrix) => (matrix.map(row => row.map(char => char)));
const log = (matrix) => (matrix.forEach(row => console.log(row.join(''))));

function day6() {
    const fs = require('fs');
    const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

    const matrix = input.split('\n').map(row => row.split(''));


    const start = performance.now()

    const guard = walk(copy(matrix));
    console.log('[D6P1]', guard.virginSteps);

    const end1 = performance.now();

    const loops = findLoops(matrix, guard.plan);
    console.log('[D6P2]', loops.infiniteLoopsFound);

    const end2 = performance.now();
    console.log('Time for P1:', end1 - start);
    console.log('Time for P2:', end2 - end1);
}

function findLoops(matrix, floorPlan) {

    let infiniteLoopsFound = 0, loopCount = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            // only place items where the guard is suspected to have walked and not directly in front of him
            if (matrix[i][j] !== '#' && matrix[i][j] !== '^' && floorPlan[i][j] !== '.') {

                const newMatrix = copy(matrix);
                newMatrix[i][j] = '#';
                const caret = walk(newMatrix);

                if (caret.exitReason === 'infinite loop') infiniteLoopsFound++;
                loopCount++;
            }
        }
    }
    return { infiniteLoopsFound, loopCount };
}

function walk(matrix) {

    const caret = {
        x: matrix.findIndex(r => r.includes('^')),
        y: matrix[matrix.findIndex(r => r.includes('^'))].findIndex(char => char === '^'),
        steps: 1,
        virginSteps: 1,
        currentDirection: 'up',
        exitReason: 'end',
        plan: matrix,
    };

    const turnLog = {};
    while (true) {

        const x = caret.x + directions[caret.currentDirection].x;
        const y = caret.y + directions[caret.currentDirection].y;

        // we are out of the matrix
        if (!matrix[x] || !matrix[x][y]) break;

        // while in the matrix
        // we hit an obstacle: turn and check for infinite loop
        if (matrix[x] && matrix[x][y] === '#') {

            caret.currentDirection = directions[caret.currentDirection].turn;

            if (turnLog[`${caret.currentDirection} ${caret.x} ${caret.y}`]) {
                caret.exitReason = 'infinite loop';
                break;
            }

            turnLog[`${caret.currentDirection} ${caret.x} ${caret.y}`] = true;
            continue;
        }

        // otherwise move caret
        matrix[caret.x][caret.y] = `${directions[caret.currentDirection].symbol}`;
        caret.y = y;
        caret.x = x;
        caret.steps++;

        if (matrix[x][y] === '.') caret.virginSteps++;
        matrix[x][y] = '0';
    }
    return caret;
}
day6();