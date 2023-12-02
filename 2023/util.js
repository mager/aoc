const fs = require('fs');

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}


module.exports = { readFile };