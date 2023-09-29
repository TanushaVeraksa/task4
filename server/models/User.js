const {Schema, model, ObjectId} = require("mongoose");

const User = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    registration: {type: Date, default: Date.now},
    authorization: {type:String, default: "not authorized"},
    block: {type: String, default: "Unblock"}
})


module.exports = model('User', User);