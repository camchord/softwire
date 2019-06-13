const userInput = require('./userInput')

exports.calculate = () => {
    const [operator, cb] = userInput.chooseOperator();
    const [start, numArr] = userInput.chooseNumbers(operator);
    let solution = numArr.reduce((acc, x) => cb(acc, x), start);
    console.log(`${start} ${operator}`, numArr.join(` ${operator} `), ` =  ${solution}`);
    console.log('==========================');
}

