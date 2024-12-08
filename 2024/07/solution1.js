const fs = require('fs');
const path = require('path');

// Read input from the file
const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const equations = data.split('\n').filter(Boolean);

// Function to evaluate an expression with left-to-right evaluation
function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        }
    }
    return result;
}

// Function to generate all operator combinations
function generateOperatorCombinations(length) {
    const combinations = [];
    const totalCombinations = Math.pow(3, length); // 3^length combinations (including ||)
    for (let i = 0; i < totalCombinations; i++) {
        const operators = [];
        for (let j = 0; j < length; j++) {
            const operatorIndex = (i / Math.pow(3, j)) % 3;
            if (operatorIndex < 1) {
                operators.push('+');
            } else if (operatorIndex < 2) {
                operators.push('*');
            } else {
                operators.push('||');
            }
        }
        combinations.push(operators);
    }
    return combinations;
}

// Main logic to find valid equations
let totalCalibrationResultPart1 = 0;

equations.forEach(equation => {
    const [testValueStr, numbersStr] = equation.split(':');
    const testValue = parseInt(testValueStr.trim(), 10);
    const numbers = numbersStr.trim().split(' ').map(Number);

    const operatorCombinations = generateOperatorCombinations(numbers.length - 1);
    let isValid = false;

    operatorCombinations.forEach(operators => {
        const result = evaluateExpression(numbers, operators);
        if (result === testValue) {
            isValid = true;
        }
    });

    if (isValid) {
        totalCalibrationResultPart1 += testValue;
    }
});

console.log(`Part 1 - Total Calibration Result: ${totalCalibrationResultPart1}`);

// Main logic to find valid equations for part 2
let totalCalibrationResultPart2 = 0;

equations.forEach(equation => {
    const [testValueStr, numbersStr] = equation.split(':');
    const testValue = parseInt(testValueStr.trim(), 10);
    const numbers = numbersStr.trim().split(' ').map(Number);

    const operatorCombinations = generateOperatorCombinations(numbers.length - 1);
    let isValid = false;

    operatorCombinations.forEach(operators => {
        const result = evaluateExpression(numbers, operators, true); // Pass true for part 2
        if (result === testValue) {
            isValid = true;
        }
    });

    if (isValid) {
        totalCalibrationResultPart2 += testValue;
    }
});

console.log(`Part 2 - Total Calibration Result: ${totalCalibrationResultPart2}`);

