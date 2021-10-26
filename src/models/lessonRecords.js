const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonRecords = new Schema({
    dateCreation: { 
        type: String, 
        require: true
    },
    pointsObtained: { 
        type: Number,
        require: true
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    idLesson: [{ type: Schema.Types.ObjectId, ref: "Lessons" }]
});

lessonRecords.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("LessonRecords", lessonRecords);