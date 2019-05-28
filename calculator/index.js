const readline = require('readline-sync');

console.log('Welcome to the calculator!');

function calculate() {
    let operator = readline.question("Please enter the operator: ");
    let num1 = +readline.question("Please enter the first number: ");
    let num2 = +readline.question("Please enter the second number: ");
    let solution;
    switch (operator) {
        case '+':
            solution = num1 + num2;
            break;
        case '-':
            solution = num1 - num2;
            break;
        case '*':
            solution = num1 * num2;
            break;
        case '/':
            solution = num1 / num2;
            break;
        default:
            return console.log('Invalid operator, please try again');
    }
    console.log(`${num1} ${operator} ${num2} = ${solution}`);
}

calculate();