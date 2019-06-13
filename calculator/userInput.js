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
            console.log('Invalid operator');
            return this.chooseOperator()
    }
}

exports.chooseNumbers = (operator) => {
    let numArr = [];
    let size = NaN;
    while (isNaN(size)) {
        size = +readline.question(`How many numbers would you like to ${operator}? `);
        if (isNaN(size)) {
            console.log('Not a valid number')
        }
    }
    for (let i = 1; i <= size; i++) {
        let x = NaN;
        while (isNaN(x)) {
            x = +readline.question(`Please enter number ${i}: `);
            if (isNaN(x)) {
                console.log('Not a valid number')
            }
        }
        numArr.push(x);
    }
    let start = numArr.shift();
    if (operator === '/') {
        numArr = numArr.filter((x) => x !== 0);
    }
    return [start, numArr]
}

exports.stringInput = () => {
    return readline.question('Please enter a string: ')
}