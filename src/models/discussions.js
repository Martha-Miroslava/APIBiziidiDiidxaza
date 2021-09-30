const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussion = new Schema({
    _id: Schema.Types.ObjectId,
    title: { 
        type: String,
        require: true
    },
    comment: { 
        type: String,
        require: true
    },
    dateCreation: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: Number,
        min: 1,
        max: 3,
        require: true
    },
    theme: {
        type: Number,
        min: 1,
        max: 3,
        require: true
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }]
});

discussion.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Discussions',discussion);