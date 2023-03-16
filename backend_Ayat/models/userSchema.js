const mongoose = require('mongoose');
const bcrypt  = require("bcryptjs")
// defining schema

const userSchema = mongoose.Schema({
 name:String,
 phone:String,
 email:String,
})
userSchema.methods.comparePassword =(password,hashPassword)=>{
  return bcrypt.compareSync(password,hashPassword)
}
module.exports = userSchema