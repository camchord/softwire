const readline = require("readline-sync");

const rules = {
    numbers: [3,5,7,11,13,17],
    3: (arr) => {arr.push("Fizz")},
    5: (arr) => {arr.push("Buzz")},
    7: (arr) => {arr.push("Bang")},
    11: (arr) => {arr.splice(0, arr.length, "Bong")},
    13: (arr) => {let index = arr.map(word => word[0]).indexOf("B");
                    if (index === -1) {
                        arr.push("Fezz");
                    } else {
                        arr.splice(index, 0, "Fezz");
                    }
                },
    17: (arr) => {arr.reverse()}
}

exports.rules = rules

const ruleType = {
    simple: 's',
    complex: 'c'
}

exports.addRules = () => {
    while (true) {
        const addRule = readline.question("Would you like to add a rule? (Y/N) ");
        if (addRule === "Y") {
            const simpleorComplex = readline.question("Simple rule (No JS), or Complex Rule (JS)? (S/C) ").toLowerCase();
            if (simpleorComplex === ruleType.complex) {
                const numInput = readline.question("If the number is a multiple of... ");
                if (isNaN(numInput)) {
                    console.log("Thats not a number!");
                    continue;
                } else {
                    num = parseInt(numInput)
                }
                const rule = readline.question("... I must ... (this must take the form of a javascript function, with the input arr being the array of words the computer must say) ")
                rules.numbers.unshift(num)
                rules[num] = Function("arr", rule)
            } else if (simpleorComplex === ruleType.simple) {
                const numInput = readline.question("If the number is a multiple of... ");
            if (isNaN(numInput)) {
                console.log("Thats not a number!");
                continue;
            } else {
                num = parseInt(numInput)
            }
            const rule = readline.question("... I must say ... ")
            rules.numbers.unshift(num)
            rules[num] = (arr) => {arr.push(rule)}
            }
        } else if (addRule === "N") {
            break;
        }
    }
}