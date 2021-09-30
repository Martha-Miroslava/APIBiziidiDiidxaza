const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonHistories = new Schema({
    _id: Schema.Types.ObjectId,
    dateCreation: { 
        type: Date, 
        default: Date.now 
    },
    pointsObtained: { 
        type: Int32,
        require: true
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
    idLesson: [{ type: Schema.Types.ObjectId, ref: 'Lessons' }]
});

lessonHistories.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('LessonHistories',lessonHistories);