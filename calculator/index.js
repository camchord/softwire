const arithmetic = require('./arithmetic');
const vowels = require('./vowelCounting');
const userInput = require('./userInput');

console.log('Welcome to the calculator!');
console.log('==========================');

while(true) {
    const mode = userInput.chooseMode();
    if (mode == 1) {
        arithmetic.calculate();
    } else if (mode == 2) {
        vowels.calculate();
    } else if (mode == 3) {
        break;
    }
}