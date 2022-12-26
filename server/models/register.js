const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ecom");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required: true, unique:true},
    phoneNumber:{type:Number, required:true, unique:true},
    password:{type:String, required:true}
})

const registerdUsers = mongoose.model("registerdUsers", registerSchema);

module.exports = registerdUsers;