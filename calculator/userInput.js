const readline = require('readline-sync');

exports.chooseMode = () => {
    return readline.question(`What Calculation Mode do you want?
    1 - Arithmetic
    2 - Vowel Counting
    3 - Quit
    `)
}

exports.chooseOperator = () => {
    const operator = readline.question("Please enter the operator: ");
    switch (operator) {
        case '+':
            return [operator, (x,y) => x + y];
        case '-':
            return [operator, (x,y) => x - y];
        case '*':
            return [operator, (x,y) => x * y];
        case '/':
            return [operator, (x,y) => x / y];
        default:
            return ['?', (x,y) => 0];
    }
}

exports.chooseNumbers = (operator) => {
    let numArr = [];
    let size = +readline.question(`How many numbers would you like to ${operator}? `);
    for (let i = 1; i <= size; i++) {
        let x = +readline.question(`Please enter number ${i}: `);
        if (isNaN(x)) {
            console.log('Not a valid number')
        } else {
            numArr.push(x);
        } 
    }
    let start = numArr.shift();
    return [start, numArr]
}

exports.stringInput = () => {
    return readline.question('Please enter a string: ')
}