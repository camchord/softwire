const readline = require("readline-sync");

const fizzBuzz = require('./fizzbuzz');
const addRules = require('./rules').addRules;

addRules();

while (true) {
    const maxNumInput = readline.question("What is the maximum number you would like to FizzBuzz to? ");
    if (isNaN(maxNumInput)) {
        console.log("Thats not a number!")
    } else {
        maxNum = parseInt(maxNumInput);
        break;
    }
}

for (let i = 1; i <= maxNum; i++) {
    console.log(fizzBuzz(i));
}