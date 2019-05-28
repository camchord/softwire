const readline = require('readline-sync');

console.log('Welcome to the calculator!');

function calculate() {
    let operator = readline.question("Please enter the operator: ");
    let cb;
    switch (operator) {
        case '+':
            cb = (x,y) => x + y;
            break;
        case '-':
            cb = (x,y) => x - y;
            break;
        case '*':
            cb = (x,y) => x * y;
            break;
        case '/':
            cb = (x,y) => x / y;
            break;
        default:
            return console.log('Invalid operator, please try again');
    }
    let numArr = [];
    let size = +readline.question(`How many numbers would you like to ${operator}? `);
    for (let i = 1; i <= size; i++) {
        let x = +readline.question(`Please enter number ${i}: `);
        numArr.push(x);
    }
    let start = numArr.shift();
    let solution = numArr.reduce((acc, x) => cb(acc, x), start);
    console.log(`${start} ${operator}`, numArr.join(` ${operator} `), '=' , solution);
}

calculate();