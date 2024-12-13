/* Example input

654329854329876510123231016987212010510218565101234510343
789218765010945678754122987878900123424309654345679623490
543201698541232789669003456987210874535698701234388701581
650165467432871694578712012076321965549785698323897632672
569870346501960543209873453125409876678012587610432543543
678761250123451632114562164534012761237703476526501105412
879610167245893101023470079643443450349812345457432236903
965673298436734345652981188712565621056789400348901247894
434789567823321238761892199801874872341019511289187656785
323458478910210679850743056765923985432678521898096105016
012367320154301589012656145678910676563565430787145234127
121032110263469874322347238765876545612346541256230873298
678545021378954365411038389054985434501487632344321964343
569956985489565243506789872123010123676598701015423459652

*/

const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8').split('\n');;

const trailheadTops = {};
const queue = [];
const width = data[0].length;
const height = data.length;
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let id = 0;

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (data[i][j] === '0') {
            trailheadTops[id] = new Set();
            queue.push({ id: id++, x: j, y: i, height: 0 });
        }
    }
}

while (queue.length > 0) {
    const trailhead = queue.shift();

    for (const dir of dirs) {
        const nextStep = {
            id: trailhead.id,
            x: trailhead.x + dir[0],
            y: trailhead.y + dir[1],
            height: trailhead.height + 1  // This should match the next number we're looking for
        };

        // Check bounds and if the next position contains the number we're looking for
        if (nextStep.x >= 0 && nextStep.x < width &&
            nextStep.y >= 0 && nextStep.y < height &&
            parseInt(data[nextStep.y][nextStep.x]) === nextStep.height) {  // Convert string to number

            if (nextStep.height === 9 && !trailheadTops[nextStep.id].has(`${nextStep.x},${nextStep.y}`)) {
                trailheadTops[nextStep.id].add(`${nextStep.x},${nextStep.y}`);
            } else {
                queue.push(nextStep);
            }
        }
    }
}

console.log(Object.values(trailheadTops).reduce((a, c) => c.size + a, 0));