const moment = require('moment');

class Account {
    constructor(name, transaction) {
        this.name = name;
        this.transactions = [transaction];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction)
    }

    balance() {
        return this.transactions.reduce((acc, transaction) => {
            if (transaction.From === this.name) {
                return acc - transaction.Amount
            } else {
                return acc + transaction.Amount
            }
        },0).toFixed(2);
    }

    listAccount() {
        if (this.transactions.some(transaction => transaction.Error.length > 0)) {
            console.log('ERROR - Some of your transactions include invalid data formats, please correct this');
        } else {
            console.log(`${this.name}`);
            this.transactions.forEach(transaction => {console.log(`Date: ${transaction.Date.format("DD/MM/YYYY")} - ${transaction.From === this.name ? "To" : "From"}: ${transaction.From === this.name ? transaction.To : transaction.From} - Amount: ${transaction.From === this.name ? "-" : ""}${transaction.Amount.toFixed(2)} - Reference: ${transaction.Narrative}`)
        })
        }
        
    }
}

exports.createAccounts = (data) => {
    const accounts = []
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
    return accounts
}
exports.Account = Account;