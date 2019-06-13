const userInput = require('./userInput');

const vowelMap = (string, vowels) => {
    for (let c of string) {
        switch (c.toUpperCase()) {
            case 'A':
                vowels.A++;
                break;
            case 'E':
                vowels.E++;
                break;
            case 'I':
                vowels.I++;
                break;
            case 'O':
                vowels.O++;
                break;
            case 'U':
                vowels.U++;
                break;
        }
    }
    return vowels;
}

exports.calculate = () => {
    const vowels = {
        A: 0,
        E: 0,
        I: 0,
        O: 0,
        U: 0
    }
    const string = userInput.stringInput();
    const result = vowelMap(string, vowels);
    console.log(`
Vowel Counts: 
    A: ${result.A}
    E: ${result.E}
    I: ${result.I}
    O: ${result.O}
    U: ${result.U}
    `);
}