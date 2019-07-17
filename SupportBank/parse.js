const path = require('path');

const moment = require('moment');
const log4js = require('log4js');

const logger = log4js.getLogger('file');

const csvParse = (rawData) => {
    const arrData = rawData.toString().split('\n');
    return arrData.filter(transaction => {
        entries = transaction.split(',');
        return (entries[1] !== "From") && (entries[1] !== undefined || entries[2] !== undefined || entries[3] !== undefined)
    })
    .map((transaction, i) => {
        entries = transaction.split(',');
        const result = {
            Date: moment(entries[0],'DD/MM/YYYY'),
            From: entries[1],
            To: entries[2],
            Narrative: entries[3],
            Amount: parseFloat(entries[4]),
            Error: []
        }
        if(!moment(entries[0],'DD/MM/YYYY').isValid()) {
            logger.error(`Invalid Date on line ${i+2}`);
            console.log(`\nError\n\nInvalid Date on line ${i+2}\n`)
            result.Error.push('Date')
        }
        if(isNaN(entries[4])) {
            logger.error(`Invalid Amount on line ${i+2}`)
            console.log(`\nError\n\nInvalid Amount on line ${i+2}\n`)
            result.Error.push('Amount')
        }
        return result
    });
}

const jsonParse = (rawData) => {
    const arrData = JSON.parse(rawData);
    return arrData.map(transaction => {
        return {
            Date: moment(transaction.Date),
            From: transaction.FromAccount,
            To: transaction.ToAccount,
            Narrative: transaction.Narrative,
            Amount: transaction.Amount,
            Error:[]
        }
    })
}

const xmlParse = (rawData) => {
    const transactions = rawData.toString().split('</SupportTransaction>');
    transactions.pop();
    return transactions.map(transaction => {
        const date = transaction.match(/Date="[0-9]{5}"/)[0].slice(6,11);
        const fromPreSlice = transaction.match(/<From>.*<\/From>/)[0];
        const from = fromPreSlice.slice(6,fromPreSlice.length-7);
        const toPreSlice = transaction.match(/<To>.*<\/To>/)[0];
        const to = toPreSlice.slice(4, toPreSlice.length - 5);
        const narrativePreSlice = transaction.match(/<Description>.*<\/Description>/)[0];
        const narrative = narrativePreSlice.slice(13, narrativePreSlice.length - 14);
        const amountPreSlice = transaction.match(/<Value>.*<\/Value>/)[0];
        const amount = amountPreSlice.slice(7, amountPreSlice.length - 8);
        return {
            Date: moment('31/12/1899','DD/MM/YYYY').add(date, 'days'),
            From: from,
            To: to,
            Narrative: narrative,
            Amount: parseFloat(amount),
            Error:[]
        }
    })
}

exports.chooseParse = (filename, data) => {
    const filetype = filename.split('.').pop();
    switch (filetype) {
        case 'json':
            return jsonParse(data);
        case 'csv':
            return csvParse(data);
        case 'xml':
            return xmlParse(data);
        default:
            return data;
    }
}