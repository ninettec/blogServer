const mongoose = require("mongoose");

var MongoClient = require("mongodb").MongoClient;

const UserSchema = new mongoose.Schema({
    username: {
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String

    },
    profilePicture:{
        type:String,
    },
},
{ timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);