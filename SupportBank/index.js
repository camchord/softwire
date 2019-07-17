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

const listAll = () => {
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
            listAll();
        } else if (mode.slice(0,4).toLowerCase() === "list") {
            const account = accounts.find(account => account.name === mode.slice(5, mode.length));
            if (account) {
                account.listAccount();
            } else {
                console.log("No account with that name found, please try again!");
            }
        } else if (mode.slice(0,11).toLowerCase() === 'import file') {
            clear();
            importFile(mode.slice(12, mode.length));
            break;
        } else if (mode.slice(0,7).toLowerCase() === 'balance') {
            const account = accounts.find(account => account.name === mode.slice(8, mode.length))
            if (account) {
                console.log(`${account.name}, your balance is ${account.balance()}`);
            } else {
                console.log("No account with that name found, please try again!");
            }
        } else if (mode.toLowerCase() === 'export transactions') {
            exportFile.exportTransactions(transactions, () => {
                bankApp();
            });
            break;
        } else if (mode.toLowerCase() === 'export accounts') {
            exportFile.exportAccounts(accounts, () => {
                bankApp();
            })
        }
    }
}

const importFile = (filename) => {
    fs.readFile(path.join('data', filename), (err, rawData) => {
            transactions = parse.chooseParse(filename, rawData);
            accounts = account.createAccounts(transactions);
            bankApp();
        })
}

console.log('Welcome to SupportBank!')
console.log('Please choose a file to upload')
let filename = readline.prompt();

importFile(filename);