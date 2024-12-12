const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

// Convert input string into array of numbers
const numbers = data.split('').map(Number);


// Create initial disk representation with file IDs
function createInitialDisk() {
    const disk = [];
    let fileId = 0;
    let position = 0;

    for (let i = 0; i < numbers.length; i++) {
        const length = numbers[i];

        if (i % 2 === 0) { // File
            for (let j = 0; j < length; j++) {
                disk[position++] = fileId;
            }
            fileId++;
        } else { // Free space
            for (let j = 0; j < length; j++) {
                disk[position++] = '.';
            }
        }
    }

    return disk;
}


// Helper function to get file size
function getFileSize(disk, fileId) {
    return disk.filter(id => id === fileId).length;
}

// Find leftmost suitable free space for a file
function findLeftmostSpace(disk, startIndex, requiredSize) {
    let currentFreeSpace = 0;
    let startPosition = -1;

    for (let i = 0; i < startIndex; i++) {
        if (disk[i] === '.') {
            if (currentFreeSpace === 0) startPosition = i;
            currentFreeSpace++;
            if (currentFreeSpace === requiredSize) return startPosition;
        } else {
            currentFreeSpace = 0;
            startPosition = -1;
        }
    }
    return -1; // No suitable space found
}

// Compact the disk by moving individual blocks
function compactDisk(disk) {
    const compacted = [...disk];

    for (let i = 0; i < compacted.length; i++) {
        if (compacted[i] !== '.') {
            // Look for earliest free space
            for (let j = 0; j < i; j++) {
                if (compacted[j] === '.') {
                    // Move block to free space
                    compacted[j] = compacted[i];
                    compacted[i] = '.';
                    break;
                }
            }
        }
    }

    return compacted;
}

// Compact the disk by moving whole files
function compactDiskWholeFiles(disk) {
    const compacted = [...disk];
    const maxFileId = Math.max(...compacted.filter(id => id !== '.'));

    // Process files in decreasing order of file ID
    for (let fileId = maxFileId; fileId >= 0; fileId--) {
        // Find leftmost position of current file
        const firstPos = compacted.indexOf(fileId);
        if (firstPos === -1) continue;

        const fileSize = getFileSize(compacted, fileId);
        const newPosition = findLeftmostSpace(compacted, firstPos, fileSize);

        if (newPosition !== -1) {
            // Move the entire file
            const filePositions = compacted
                .map((id, index) => id === fileId ? index : -1)
                .filter(index => index !== -1);

            // Clear old positions
            filePositions.forEach(pos => compacted[pos] = '.');

            // Place file in new position
            for (let i = 0; i < fileSize; i++) {
                compacted[newPosition + i] = fileId;
            }
        }
    }

    return compacted;
}

// Calculate checksum
function calculateChecksum(disk) {
    return disk.reduce((sum, fileId, position) => {
        if (fileId !== '.') {
            return sum + (position * fileId);
        }
        return sum;
    }, 0);
}

// Solve both parts
const initialDisk = createInitialDisk();
const compactedDisk = compactDisk(initialDisk);
const compactedDiskWholeFiles = compactDiskWholeFiles(initialDisk);
const part1 = calculateChecksum(compactedDisk);
const part2 = calculateChecksum(compactedDiskWholeFiles);

console.log('Part 1 - Block movement checksum:', part1);
console.log('Part 2 - Whole file movement checksum:', part2);