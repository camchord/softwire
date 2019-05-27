const readline = require('readline-sync');

console.log('Welcome to the calculator!');

function multiply() {
    console.log('Enter your first number to multiply');
    const x = readline.prompt();
    console.log('Enter your second number to multiply');
    const y = readline.prompt();
    const result = +x * +y
    console.log(x, ' x ', y, ' = ', result);
}

multiply();