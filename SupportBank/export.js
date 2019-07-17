const path = require('path');
const fs = require('fs');

const moment = require('moment');

exports.exportAccounts = (accounts, callback) => {
    const json = JSON.stringify(accounts);
    fs.writeFile(path.join('data','output',`accounts-${moment().format('DD-MM-YY-h-mm-ss')}.json`), json, (err) => {
        if (err) throw err
        callback()
    })
}

exports.exportTransactions = (transactions, callback) => {
    const json = JSON.stringify(transactions);
    fs.writeFile(path.join('data','output',`transactions-${moment().format('DD-MM-YY-h-mm-ss')}.json`), json, (err) => {
        if (err) throw err
        callback()
    })
}