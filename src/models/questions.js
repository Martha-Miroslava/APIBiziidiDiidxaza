const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questions = new Schema({
    score: { 
        type: Number,
        require: true
    },
    level: { 
        type: String,
        default: "easy",
        enum: ["easy", "half", "difficult"],
        require: true
    },
    typeQuestion: { 
        type: String,
        default: "only",
        enum: ["only", "multiple"],
        require: true 
    },
    question: { 
        type: String,
        require: true
    },
    URL: { 
        type: String,
        require: true
    },
    idLesson: [{ type: Schema.Types.ObjectId, ref: 'Lessons' }]
});

questions.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Questions',questions);