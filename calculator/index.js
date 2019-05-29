const readline = require('readline-sync');

const welcome = () => {
    console.log('Welcome to the calculator!');
    console.log('==========================');
}

const chooseOperator = () => {
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

const chooseNumbers = (operator) => {
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

const answer = (operator, cb, start, numArr) => {
    let solution = numArr.reduce((acc, x) => cb(acc, x), start);
    console.log(`${start} ${operator}`, numArr.join(` ${operator} `), '=' , solution);
    console.log('==========================');
}

const calculate = () => {
    const [operator, cb] = chooseOperator();
    const [start, numArr] = chooseNumbers(operator);
    answer(operator, cb, start, numArr);
}

welcome();
while (true) {    
    calculate();
}