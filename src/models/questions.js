const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questions = new Schema({
    _id: Schema.Types.ObjectId,
    score: { 
        type: Int32,
        require: true
    },
    level: { 
        type: Number,
        min: 1,
        max: 3,
        require: true
    },
    type: { 
        type: Number,
        min: 1,
        max: 2,
        require: true 
    },
    question: { 
        type: String,
        require: true
    },
    URLQuestion: { 
        type: String,
        require: true
    },
    idLesson: [{ type: Schema.Types.ObjectId, ref: 'Lessons' }]
});

questions.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Questions',questions);