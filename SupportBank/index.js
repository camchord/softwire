const fs = require('fs');
const path = require('path');

const readline = require('readline-sync');
const log4js = require('log4js');

const parse = require('./parse');
const exportFile = require('./export');
const account = require('./account');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: path.join('logs', 'debug.log')}
    },
    categories: {
        default: { appenders: ['file'], level: 'trace'}
    }
});

Account = account.Account;
let accounts = [];
let transactions = [];

const importFile = (filename) => {
    fs.readFile(path.join('data', filename), (err, rawData) => {
        if (!err) {
            const data = parse.chooseParse(filename, rawData)
            transactions = transactions.concat(data);
            account.createAccounts(data, accounts);
            console.log('File successfully imported!')
            bankApp();
        } else {
            console.log('This file does not exist');
            bankApp();
        } 
    })
}

const printAll = () => {
    accounts.forEach(account => console.log(account.name));
    bankApp();
}
const clear = () => {
    accounts.splice(0, accounts.length);
    transactions.splice(0, transactions.length);
    bankApp();
}

const list = (name) => {
    const account = accounts.find(account => account.name === name);
        if (account) {
            account.printAccount();
        } else {
            console.log("No account with that name found, please try again!");
        }
    bankApp();
}

const balance = (name) => {
    const account = accounts.find(account => account.name === name)
            if (account) {
                console.log(`${account.name}, your balance is ${account.balance()}`);
            } else {
                console.log("No account with that name found, please try again!");
            }
    bankApp();
}

const exportTransactions = (input) => {
    exportFile.exportTransactions(transactions, input.slice(20, input.length).toLowerCase(), () => {
        bankApp();
    });
}

const exportAccounts = (input) => {
    exportFile.exportAccounts(accounts, input.slice(16, input.length).toLowerCase(), () => {
        bankApp();
    });
}

const exportAccount = (input) => {
    const instructionArray = input.split(' ');
    const filetype = instructionArray.pop();
    const accountName = instructionArray.slice(1, instructionArray.length).join(' ');
    const account = accounts.find(account => account.name === accountName);
    exportFile.exportAccount(account, filetype, () => {
        bankApp();
    });
}

const invalid = () => {
    console.log('Invalid command');
    bankApp();
}

const bankApp = () => {
    console.log("\n\nWould you like to:\nIMPORT a file\nLIST ALL accounts\nLIST a single named account\nRequest an account BALANCE\nEXPORT ACCOUNTS (json/xml)\nEXPORT TRANSACTIONS (json/csv/xml)\nEXPORT transactions for a single named account (json/csv/xml)\nCLEAR")
    const input = readline.prompt();
    const mode = chooseMode(input);
    switch(mode) {
        case 1:
            return importFile(input.slice(7, input.length));
        case 2:
            printAll();
            break;
        case 3:
            list(input.slice(5, input.length));
            break;
        case 4:
            balance(input.slice(8, input.length));
            break;
        case 5:
            exportTransactions(input);
            break;
        case 6:
            exportAccounts(input);
            break;
        case 7:
            exportAccount(input);
            break;
        case 8:
            clear();
            break;
        case 9:
            invalid();
            break;
        }
}

const chooseMode = (mode) => {    
    if (mode.slice(0,6).toLowerCase() === 'import') {
        return 1;
    } else if (mode.toLowerCase() === "list all") {
        return 2;
    } else if (mode.slice(0,4).toLowerCase() === "list") {
        return 3;
    } else if (mode.slice(0,7).toLowerCase() === 'balance') {
        return 4;
    } else if (mode.slice(0,19).toLowerCase() === 'export transactions') {
        return 5;
    } else if (mode.slice(0,15).toLowerCase() === 'export accounts') {
        return 6;
    } else if (mode.slice(0,6).toLowerCase() === "export") {
        return 7;
    } else if (mode === 'clear') {
        return 8;
    } else {
        return 9;
    }
}

console.log('Welcome to SupportBank!')
bankApp();