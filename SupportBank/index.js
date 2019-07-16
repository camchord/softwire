const fs = require('fs');
const moment = require('moment');

let rawData

class Account {
    constructor(name, transaction) {
        this.name = name;
        this.transactions = [transaction];
        this.total = 0;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction)
    }

    total() {

    }
}

const accounts = []

const createAccounts = (data) => {
    data.forEach((ts) => {
        let from = ts.From;
        let to = ts.To;
        let fromIndex = accounts.findIndex(account => account.name === from);
        let toIndex = accounts.findIndex(account => account.name === to);
        if (fromIndex === -1) {
            accounts.push(new Account(from, ts))
        } else {
            accounts[fromIndex].addTransaction(ts)
        }
        if (toIndex === -1) {
            accounts.push(new Account(to, ts))
        } else {
            accounts[toIndex].addTransaction(ts)
        }
    })
}

const csvParse = (cb) => {
    console.log(rawData)
    let data = rawData.split('\n').map((ts) => {
        entries = ts.split(',');
        return {
            Date: moment(entries[0],'DD/MM/YYYY'),
            From: entries[1],
            To: entries[2],
            Narrative: entries[3],
            Amount: entries[4]
        }
    });
    cb(data.slice(1,data.length-1))
    
}

fs.createReadStream('Transactions2014.csv')
    .on('data', data => rawData = data.toString())
    .on('close', () => csvParse((data) => {
        createAccounts(data);
        console.log(accounts)
    }))

    