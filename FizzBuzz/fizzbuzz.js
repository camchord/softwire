const rules = require('./rules').rules

module.exports = (i) => {
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