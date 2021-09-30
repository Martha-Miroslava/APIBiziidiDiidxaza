const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessons = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    pointsTotal: { 
        type: Int32,
        require: true
    }
});

module.exports = mongoose.model('Lessons',lessons);