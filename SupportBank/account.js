const moment = require('moment');

const accounts = []

exports.Account = class Account {
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
            console.log(`Date: ${ts.Date.format("DD/MM/YYYY")} - ${ts.From === this.name ? "To" : "From"}: ${ts.From === this.name ? ts.To : ts.From} - Amount: ${ts.From === this.name ? "-" : ""}${ts.Amount.toFixed(2)} - Reference: ${ts.Narrative}`)
        })
    }

    static listAll() {
        accounts.forEach(account => console.log(`Name: ${account.name}, Balance: ${account.total}`))
    }

    static balanceUpdate() {
        accounts.forEach(account => account.balance())
    }
}

exports.createAccounts = (data) => {
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

exports.accounts = accounts;