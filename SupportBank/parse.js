const path = require('path');

const moment = require('moment');
const log4js = require('log4js');

const logger = log4js.getLogger('file');

exports.string = (filename, data) => {
    const filetype = filename.split('.').pop();
    switch (filetype) {
        case 'json':
            return data;
        case 'csv':
        case 'xml':
                console.log(data.toString());
            return data.toString();
        default:
            return data;
    }
}

const csvParse = (rawData) => {
    let exit;
    const arrData = rawData.split('\n');
    const data = arrData.filter(ts => {
        entries = ts.split(',');
        return (entries[1] !== "From") && (entries[1] !== undefined || entries[2] !== undefined || entries[3] !== undefined)
    })
    .map((ts, i) => {
        entries = ts.split(',');
        if(!moment(entries[0],'DD/MM/YYYY').isValid()) {
            logger.error(`Invalid Date on line ${i+2}`);
            console.log(`\nError\n\nInvalid Date on line ${i+2}\n`)
            exit = true;
        }
        if(isNaN(entries[4])) {
            logger.error(`Invalid Amount on line ${i+2}`)
            console.log(`\nError\n\nInvalid Amount on line ${i+2}\n`)
            exit = true;
        }
        return {
            Date: moment(entries[0],'DD/MM/YYYY'),
            From: entries[1],
            To: entries[2],
            Narrative: entries[3],
            Amount: parseFloat(entries[4])
        }
    });
    if (exit) {
        process.exit();
    }
    return data;  
}

const jsonParse = (rawData) => {
    const arrData = JSON.parse(rawData);
    const data = arrData.map(ts => {
        return {
            Date: moment(ts.Date),
            From: ts.FromAccount,
            To: ts.ToAccount,
            Narrative: ts.Narrative,
            Amount: ts.Amount
        }
    })
    return data;
}

const xmlParse = (rawData) => {
    const transactions = rawData.split('</SupportTransaction>');
    transactions.pop();
    const result = [...transactions].map(ts => {
        const date = ts.match(/Date="[0-9]{5}"/)[0].slice(6,11);
        const fromPreSlice = ts.match(/<From>.*<\/From>/)[0];
        const from = fromPreSlice.slice(6,fromPreSlice.length-7);
        const toPreSlice = ts.match(/<To>.*<\/To>/)[0];
        const to = toPreSlice.slice(4, toPreSlice.length - 5);
        const narrativePreSlice = ts.match(/<Description>.*<\/Description>/)[0];
        const narrative = narrativePreSlice.slice(13, narrativePreSlice.length - 14);
        const amountPreSlice = ts.match(/<Value>.*<\/Value>/)[0];
        const amount = amountPreSlice.slice(7, amountPreSlice.length - 8);
        return {
            Date: moment('01/01/1900','DD/MM/YYYY').add(date, 'days'),
            From: from,
            To: to,
            Narrative: narrative,
            Amount: parseFloat(amount)
        }
    })
    return result
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