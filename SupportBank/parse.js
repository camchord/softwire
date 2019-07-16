const moment = require('moment');

exports.csvParse = (rawData, cb) => {
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