const moment = require('moment');

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
        this.total = this.transactions.reduce((acc, transaction) => {
            if (transaction.From === this.name) {
                return acc - transaction.Amount
            } else {
                return acc + transaction.Amount
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
    static clear() {
        accounts.splice(0, accounts.length)
    }
}

exports.createAccounts = (data) => {
    data.forEach(transaction => {
        const from = transaction.From;
        const to = transaction.To;
        const fromIndex = accounts.findIndex(account => account.name === from);
        const toIndex = accounts.findIndex(account => account.name === to);
        if (fromIndex === -1) {
            accounts.push(new Account(from, transaction))
        } else {
            accounts[fromIndex].addTransaction(transaction)
        }
        if (toIndex === -1) {
            accounts.push(new Account(to, transaction))
        } else {
            accounts[toIndex].addTransaction(transaction)
        }
    })
}
exports.Account = Account;

exports.accounts = accounts;