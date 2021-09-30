const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comments = new Schema({
    _id: Schema.Types.ObjectId,
    comment: { 
        type: String,
        require: true
    },
    dateCreation: { 
        type: Date, 
        default: Date.now 
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
    idDiscussion: [{ type: Schema.Types.ObjectId, ref: 'Discussions' }]
});

comments.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Comments',comments);