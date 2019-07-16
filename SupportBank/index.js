const fs = require('fs');
const moment = require('moment');

let rawData

const accounts = []

class Account {
    constructor(name, transaction) {
        this.name = name;
        this.transactions = [transaction];
        this.total = 0;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction)
    }

    balance() {
        this.total = this.transactions.reduce((acc, ts) => {
            if (ts.From === this.name) {
                return acc - ts.Amount
            } else {
                return acc + ts.Amount
            }
        },0).toFixed(2)
    }

    listAccount() {
        console.log(`${this.name} - Balance: ${this.total}`);
        this.transactions.forEach(ts => {
            console.log(`Date: ${ts.Date.format("DD/MM/YYYY")} - ${ts.From === this.name ? "To" : "From"}: ${ts.From === this.name ? ts.To : ts.From} - Amount: ${ts.From === this.name ? "-" : ""}£${ts.Amount} - Reference: ${ts.Narrative}`)
        })
    }

    static listAll() {
        accounts.forEach(account => console.log(`Name: ${account.name}, Balance: £${account.total}`))
    }

    static balanceUpdate() {
        accounts.forEach(account => account.balance())
    }
}



const createAccounts = (data) => {
    data.forEach((ts) => {
        const from = ts.From;
        const to = ts.To;
        const fromIndex = accounts.findIndex(account => account.name === from);
        const toIndex = accounts.findIndex(account => account.name === to);
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
    const data = rawData.split('\n').map((ts) => {
        entries = ts.split(',');
        return {
            Date: moment(entries[0],'DD/MM/YYYY'),
            From: entries[1],
            To: entries[2],
            Narrative: entries[3],
            Amount: parseFloat(entries[4])
        }
    });
    cb(data.slice(1,data.length-1))   
}

fs.createReadStream('Transactions2014.csv')
    .on('data', data => rawData = data.toString())
    .on('close', () => csvParse((data) => {
        createAccounts(data);
        Account.balanceUpdate();
        accounts[3].listAccount();
    }))

    