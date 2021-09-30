const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const states = new Schema({
    _id: Schema.Types.ObjectId,
    nameState: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('States',states);