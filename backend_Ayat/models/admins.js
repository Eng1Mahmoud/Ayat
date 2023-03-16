const mongoose = require('mongoose');

// defining schema

const adminSchema = mongoose.Schema({
 name:String,
 email:String,
 hashPassword:String,
 password:String,
})

module.exports = adminSchema