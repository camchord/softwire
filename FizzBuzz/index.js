const readline = require("readline-sync");

let rules = {
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

const fizzBuzz = (i) => {
    let arr = []
    rules.numbers.forEach((k) => {
        if (i % k === 0) {   
            rules[k](arr);
        }
    })
    if(arr.length > 0) {
        console.log(arr.join(''));
    } else {
        console.log(i);
    }
}

while (true) {
    let addRule = readline.question("Would you like to add a rule? (Y/N) ");
    if (addRule === "Y") {
        let numInput = readline.question("If the number is a multiple of... ");
        if (isNaN(numInput)) {
            console.log("Thats not a number!");
            continue;
        } else {
            num = parseInt(numInput)
        }
        let rule = readline.question("... I must say ... ")
        rules.numbers.unshift(num)
        rules[num] = (arr) => {arr.push(rule)}
    } else if (addRule === "N") {
        break;
    }
}

while (true) {
    let maxNumInput = readline.question("What is the maximum number you would like to FizzBuzz to? ");
    if (isNaN(maxNumInput)) {
        console.log("Thats not a number!")
    } else {
        maxNum = parseInt(maxNumInput);
        break;
    }
}


for (let i = 1; i <= maxNum; i++) {
    fizzBuzz(i);
}



/* Archive code


const fizzbuzz = i => {
    let arr = [];
    if (i % 3 === 0) {
        arr.push("Fizz");
    }
    if (i % 5 === 0) {
        arr.push("Buzz");
    }
    if (i % 7 === 0) {
        arr.push("Bang");
    }
    if (i % 11 === 0) {
        arr = ["Bong"];
    }
    if (i % 13 === 0) {
        let index = arr.map(word => word[0]).indexOf("B");
        if (index === -1) {
            arr.push("Fezz");
        } else {
            arr.splice(index, 0, "Fezz");
        }
    }
    if (i % 17 === 0) {
        arr.reverse();
    }
    if(arr.length > 0) {
        console.log(arr.join(''));
    } else {
        console.log(i);
    }
}


*/