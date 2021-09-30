const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const accounts = new Schema({
    _id: Schema.Types.ObjectId,
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
        type: Date,
        require: true
    },
    email: {
        type: String,
        unique:true,
        require: true
    },
    URLPhoto: {
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
    dateCreation: { 
        type: Date, 
        default: Date.now 
    },
    idCity: [{ type: Schema.Types.ObjectId, ref: 'Cities' }]
});

accounts.methods.encrypPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

accounts.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

accounts.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Accounts',accounts);

