const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const states = new Schema({
    nameState: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("States",states);
