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
        return arr.join('');
    } else {
        return i;
    }
}

module.exports = fizzBuzz;