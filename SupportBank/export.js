const path = require('path');
const fs = require('fs');

const moment = require('moment');

exports.exportAccounts = (accounts, filetype, callback) => {
    let data;
    if (filetype === 'json') {
        data =  JSON.stringify(accounts);
    } else if (filetype === 'xml') {
        data = accounts.reduce((data, account) => {
            return data + `
    <Account Name="${account.name}">
        <TransactionList>${account.transactions.reduce((list, transaction) => list + `
            <SupportTransaction Date="${transaction.Date.format()}">
                <Narrative>${transaction.Narrative}</Narrative>
                <Amount>${transaction.Amount}</Amount>
                <Parties>
                    <From>${transaction.From}</From>
                    <To>${transaction.To}</To>
                </Parties>
            </SupportTransaction>`, '')}
        </TransactionList>
    </Account>`
        }, '<?xml version="1.0" encoding="utf-8"?>\n<AccountList>');
        data = data + '\n</TransactionList>'
    } else {
        console.log('Invalid file format, please use json or xml');
        return callback();
    }
    fs.writeFile(path.join('data','output',`accounts-${moment().format('DD-MM-YY-h-mm-ss')}.${filetype}`), data, (err) => {
        if (err) throw err
        callback()
    })
}

exports.exportAccount = (account, filetype, callback) => {
    if (account) {
        let data
        if (filetype === 'json') {
            data = JSON.stringify(account);
        } else if (filetype === 'csv') {
            data = account.transactions.reduce((data,transaction) => data + `${transaction.Date.format('DD/MM/YYYY')},${transaction.From},${transaction.To},${transaction.Narrative},${transaction.Amount*(transaction.From === account.name ? -1 : 1)}\n`, 'Date,From,To,Narrative,Amount\n');
        } else if (filetype === 'xml') {
            data = account.transactions.reduce((data, transaction) => data + `
    <SupportTransaction Date="${transaction.Date.format()}">
        <Narrative>${transaction.Narrative}</Narrative>
        <Amount>${transaction.Amount}</Amount>
        <Parties>
            <From>${transaction.From}</From>
            <To>${transaction.To}</To>
        </Parties>
    </SupportTransaction>`, '<?xml version="1.0" encoding="utf-8"?>\n<TransactionList>');
        data = data + '\n</AccountList>'
        } else {
            console.log('Invalid file format, please use csv, json or xml');
            return callback();
        }
        fs.writeFile(path.join('data','output',`${account.name.replace(' ','-')}-${moment().format('DD-MM-YY-h-mm-ss')}.${filetype}`), data, (err) => {
            if (err) throw err
            callback()
        })
    } else {
        console.log('User not found, please try again');
        callback();
    }
}

exports.exportTransactions = (transactions, filetype, callback) => {
    let data
    if (filetype === 'json') {
        data = JSON.stringify(transactions);
    } else if (filetype === 'csv') {
        data = transactions.reduce((data,transaction) => data + `${transaction.Date.format('DD/MM/YYYY')},${transaction.From},${transaction.To},${transaction.Narrative},${transaction.Amount}\n`, 'Date,From,To,Narrative,Amount\n');
    } else if (filetype === 'xml') {
        data = transactions.reduce((data, transaction) => data + `
    <SupportTransaction Date="${transaction.Date.format()}">
        <Narrative>${transaction.Narrative}</Narrative>
        <Amount>${transaction.Amount}</Amount>
        <Parties>
            <From>${transaction.From}</From>
            <To>${transaction.To}</To>
        </Parties>
    </SupportTransaction>`, '<?xml version="1.0" encoding="utf-8"?>\n<TransactionList>');
        data = data + '\n</TransactionList>'
    } else {
        console.log('Invalid file format, please use csv, json or xml');
        return callback();
    }
    fs.writeFile(path.join('data','output',`transactions-${moment().format('DD-MM-YY-h-mm-ss')}.${filetype}`), data, (err) => {
        if (err) throw err
        callback()
    })
}