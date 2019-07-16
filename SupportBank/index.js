const fs = require('fs');
const path = require('path');

const readline = require('readline-sync');

const parse = require('./parse')
const account = require('./account')

Account = account.Account;
const accounts = account.accounts;

const bankApp = () => {
    Account.balanceUpdate();
    console.log("Welcome to SupportBank!")
    while (true) {
        console.log("Do you want to List All accounts, or List a single named account?")
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
        }
    }
}

fs.createReadStream(path.join('data','Transactions2014.csv'))
    .on('data', data => rawData = data.toString())
    .on('close', () => parse.csvParse(rawData, (data) => {
        account.createAccounts(data);
        bankApp();
    }))