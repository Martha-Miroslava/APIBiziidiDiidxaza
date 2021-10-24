const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessons = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    URL: {
        type: String
    },
    pointsTotal: { 
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("Lessons",lessons);