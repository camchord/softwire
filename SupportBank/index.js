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

const logger = log4js.getLogger('file');

Account = account.Account;
let accounts = [];
let transactions = [];

const printAll = () => {
    accounts.forEach(account => console.log(account.name))
}
const clear = () => {
    accounts.splice(0, accounts.length);
    transactions.splice(0, transactions.length)
}

const bankApp = () => {
    while (true) {
        console.log("Would you like to:\nLIST ALL accounts\nLIST a single named account\nRequest an account BALANCE\nIMPORT a different FILE\nEXPORT ACCOUNTS\nEXPORT TRANSACTIONS")
        const mode = readline.prompt();
        if (mode.toLowerCase() === "list all") {
            printAll();
        } else if (mode.slice(0,4).toLowerCase() === "list") {
            const account = accounts.find(account => account.name === mode.slice(5, mode.length));
            if (account) {
                account.printAccount();
            } else {
                console.log("No account with that name found, please try again!");
            }
        } else if (mode.slice(0,11).toLowerCase() === 'import file') {
            importFile(mode.slice(12, mode.length));
            break;
        } else if (mode.slice(0,7).toLowerCase() === 'balance') {
            const account = accounts.find(account => account.name === mode.slice(8, mode.length))
            if (account) {
                console.log(`${account.name}, your balance is ${account.balance()}`);
            } else {
                console.log("No account with that name found, please try again!");
            }
        } else if (mode.slice(0,19).toLowerCase() === 'export transactions') {
            exportFile.exportTransactions(transactions, mode.slice(20, mode.length).toLowerCase(), () => {
                bankApp();
            });
            break;
        } else if (mode.toLowerCase() === 'export accounts') {
            exportFile.exportAccounts(accounts, () => {
                bankApp();
            });
            break;
        } else if (mode.slice(0,6).toLowerCase() === "export") {
            const instructionArray = mode.split(' ');
            const filetype = instructionArray.pop();
            const accountName = instructionArray.slice(1, instructionArray.length).join(' ');
            const account = accounts.find(account => account.name === accountName);
            exportFile.exportAccount(account, filetype, () => {
                bankApp();
            });
            break;
        } else if (mode === 'clear') {
            clear();
        }
    }
}

const importFile = (filename) => {
    fs.readFile(path.join('data', filename), (err, rawData) => {
            transactions = parse.chooseParse(filename, rawData);
            account.createAccounts(transactions, accounts);
            bankApp();
        })
}

console.log('Welcome to SupportBank!')
bankApp();