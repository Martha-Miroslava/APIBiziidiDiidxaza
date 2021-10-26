const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const accounts = new Schema({
    lastname: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    dateBirth: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique:true,
        require: true
    },
    URL: {
        type: String
    },
    username: {
        type: String,
        unique:true,
        require: true
    },
    password: {
        type:String,
        require: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "manager"],
        require: true
    },
    status: {
        type: Number,
        min: 1,
        max: 3,
        require: true
    },
    codeConfirmation: {
        type: Number,
        require: true
    },
    dateCreation: { 
        type: String,
        require: true
    },
    idCity: [{ type: Schema.Types.ObjectId, ref: "Cities"}],
    discussions: [{ type: Schema.Types.ObjectId, ref: "Discussions"}]
});

accounts.methods.encrypPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

accounts.methods.matchPassword = async (password, passwordCurrent) => {
    return await bcrypt.compare(password, passwordCurrent);
};

accounts.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Accounts",accounts);

