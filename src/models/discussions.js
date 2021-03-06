const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussions = new Schema({
    title: { 
        type: String,
        require: true
    },
    titleUpper: { 
        type: String,
        require: true
    },
    comment: { 
        type: String,
        require: true
    },
    dateCreation: { 
        type: String, 
        default: Date.now 
    },
    status: {
        type: Number,
        min: 1,
        max: 3,
        require: true
    },
    theme: {
        type: String,
        default: "info",
        enum: ["info", "duda", "regla"],
        require: true
    },
    numberComments:{
        type: Number,
        default: 0,
        require: true
    },
    idAccount: [{ type: Schema.Types.ObjectId, ref: "Accounts"}]
});

discussions.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Discussions",discussions);
