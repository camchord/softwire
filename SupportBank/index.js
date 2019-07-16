const fs = require('fs');
const path = require('path');

const readline = require('readline-sync');
const log4js = require('log4js');

const parse = require('./parse')
const account = require('./account')

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
const accounts = account.accounts;

const bankApp = () => {
    Account.balanceUpdate();
    while (true) {
        console.log("Do you want to List All accounts, List a single named account, or choose another file?")
        let mode = readline.prompt();
        if (mode === "List All") {
            Account.listAll();
        } else if (mode.slice(0,4) === "List") {
            let account = accounts.find(a => a.name === mode.slice(5, mode.length));
            if (account) {
                account.listAccount();
            } else {
                console.log("No account with that name found, please try again!")
            }
        } else if (mode.slice(0,11) === 'Import File') {
            Account.clear();
            importFile(mode.slice(12, mode.length));
            break;
        }
    }
}

const importFile = (filename) => {
    fs.createReadStream(path.join('data', filename))
        .on('data', data => rawData = parse.string(filename, data))
        .on('close', () => {
            data = parse.chooseParse(filename, rawData);
            account.createAccounts(data);
            bankApp();
        })
}

console.log('Welcome to SupportBank!')
console.log('Please choose a file to upload')
let filename = readline.prompt();

importFile(filename);