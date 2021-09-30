const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cities = new Schema({
    _id: Schema.Types.ObjectId,
    nameCity: {
        type: String,
        require: true
    },
    idState: [{ type: Schema.Types.ObjectId, ref: 'States' }]
});

cities.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Cities',cities);