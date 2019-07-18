const fizzBuzz = require('./fizzbuzz').fizzBuzz;

const tests = [[3,"Fizz"],[5,"Buzz"],[7,"Bang"],[11,"Bong"],[13,"Fezz"],[15,"FizzBuzz"],[21,"FizzBang"],[33,"Bong"],[65,"FezzBuzz"]];

tests.forEach(t => {
    test(`${t[0]} returns ${t[1]}`, () => {
        expect(fizzBuzz(t[0])).toBe(t[1])
    })
})