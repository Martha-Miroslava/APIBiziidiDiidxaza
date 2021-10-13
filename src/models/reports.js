const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reports = new Schema({
    reason: {
        type: String,
        require: true
    },
    context: {
        type: String,
        require: true
    },
    dateCreation: { 
        type: Date,
        require: true
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
    accountReported: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }]
});

reports.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Reports',reports);