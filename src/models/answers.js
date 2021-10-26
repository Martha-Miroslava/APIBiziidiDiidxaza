const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answers = new Schema({
    answers: { 
        type: String,
        require: true
    },
    isValid: { 
        type: Boolean,
        require: true,
        default: false
    },
    idQuestion: [{ type: Schema.Types.ObjectId, ref: "Questions" }]
});

answers.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Answers",answers);