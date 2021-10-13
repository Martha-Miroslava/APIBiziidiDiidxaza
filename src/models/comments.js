const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comments = new Schema({
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
        max: 2,
        require: true
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
    idDiscussion: [{ type: Schema.Types.ObjectId, ref: 'Discussions' }]
});

comments.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Comments',comments);