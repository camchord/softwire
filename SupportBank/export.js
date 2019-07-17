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

exports.exportAccount = (account, filetype, callback) => {
    let data
    if (filetype === 'json') {
        data = JSON.stringify(account);
        
    } else if (filetype === 'csv') {
        data = account.transactions.reduce((data,transaction) => data + `${transaction.Date.format('DD/MM/YYYY')},${transaction.From},${transaction.To},${transaction.Narrative},${transaction.Amount*(transaction.From === account.name ? -1 : 1)}\n`, 'Date,From,To,Narrative,Amount\n');
    }
    fs.writeFile(path.join('data','output',`${account.name.replace(' ','-')}-${moment().format('DD-MM-YY-h-mm-ss')}.${filetype}`), data, (err) => {
        if (err) throw err
        callback()
    })
}

exports.exportTransactions = (transactions, filetype, callback) => {
    let data
    if (filetype === 'json') {
        data = JSON.stringify(transactions);
        
    } else if (filetype === 'csv') {
        data = transactions.reduce((data,transaction) => data + `${transaction.Date.format('DD/MM/YYYY')},${transaction.From},${transaction.To},${transaction.Narrative},${transaction.Amount}\n`, 'Date,From,To,Narrative,Amount\n');
    }
    fs.writeFile(path.join('data','output',`transactions-${moment().format('DD-MM-YY-h-mm-ss')}.${filetype}`), data, (err) => {
        if (err) throw err
        callback()
    })
}