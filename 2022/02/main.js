const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');

const games = data.split('\n');

let score = 0;
games.forEach(game => {
    const [opponent, you] = game.split(' ');

    // You throw rock.
    if (you === 'X') {
        score++;

        // Rock draws rock.
        if (opponent === 'A') {
            score = score + 3;
        }

        // Rock defeats scissors.
        if (opponent === 'C') {
            score = score + 6;
        }
    }

    // You throw paper.
    if (you === 'Y') {
        score = score + 2;

        // Paper defeats rock.
        if (opponent === 'A') {
            score = score + 6;
        }

        // Paper draws paper.
        if (opponent === 'B') {
            score = score + 3;
        }
    }

    // You throw scissors.
    if (you === 'Z') {
        score = score + 3;

        // Scissors defeats paper.
        if (opponent === 'B') {
            score = score + 6;
        }

        // Scissors draws scissors.
        if (opponent === 'C') {
            score = score + 3;
        }
    }
});

// Print part one.
console.log(score);


let score2 = 0;
games.forEach(game => {
    const [opponent, result] = game.split(' ');

    // Need to lose.
    if (result === 'X') {

        // Throw scissors to lose to rock.
        if (opponent === 'A') {
            score2 = score2 + 3;
        }

        // Throw rock to lose to paper.
        if (opponent === 'B') {
            score2 = score2 + 1;
        }

        // Throw paper to lose to scissors.
        if (opponent === 'C') {
            score2 = score2 + 2;
        }
    }

    // Need to draw.
    if (result === 'Y') {
        score2 = score2 + 3;

        // Throw rock to draw with rock.
        if (opponent === 'A') {
            score2 = score2 + 1;
        }

        // Throw paper to draw with paper.
        if (opponent === 'B') {
            score2 = score2 + 2;
        }

        // Throw scissors to draw with scissors.
        if (opponent === 'C') {
            score2 = score2 + 3;
        }
    }

    // Need to win.
    if (result === 'Z') {
        score2 = score2 + 6;

        // Throw paper to defeat rock.
        if (opponent === 'A') {
            score2 = score2 + 2;
        }

        // Throw scissors to defeat paper.
        if (opponent === 'B') {
            score2 = score2 + 3;
        }

        // Throw rock to defeat scissors.
        if (opponent === 'C') {
            score2 = score2 + 1;
        }
    }
});

// Print part two.
console.log(score2);