const mongoose = require("mongoose");
const adminschema = require("../models/admins");
const admins = mongoose.model("admins", adminschema);
const userschema = require("../models/userSchema");
let users = mongoose.model("users", userschema);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("request");
const  {SendMessage} = require("./SendMessagFunction")
require("dotenv").config();
const secret = process.env.SECRET_KEY;

// fetch all users
const FetchAllUsers = () => {
  return users
    .find({})
    .then((all) => {
      return all
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all users
const getAllUsers = (req,res) => {
 users
    .find({})
    .then((all) => {
     res.json(all)
    })
    .catch((err) => {
      console.log(err);
    });
};


// login
const Login = (req, res) => {
  admins
    .findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.json({
          error: "البيانات التي تم ادخالها غير مطابقة لبيانات اي مسئول ",
          verified: false,
        });
      }
      bcrypt
        .compare(req.body.password, admin.hashPassword)
        .then((match) => {
          if (match) {
            const token = jwt.sign(
              { email: admin.email, id: admin._id },
              secret
            );
            res.json({ verified: true, token: token });
            console.log(token);
          } else {
            res.json({
              error: "الرجاء التاكد من كلمة المرور ثم حاول مجددا",
              verified: false,
            });
            console.log(" not verifid");
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
};
// replay to users
const replay = (req,res)=>{
  SendMessage(req.body.to,req.body.replay)
}

// send message to users 
const SendMessageToUser = async(req,res)=>{
  const allUsers = await FetchAllUsers();
  if(req.body.type){
  
    var options = {
      method: 'POST',
      url: `https://api.ultramsg.com/${process.env.INSTANCE_ID}/messages/video`,
      headers: {'content-type': ' application/x-www-form-urlencoded'},
      form: {
        "token":process.env.WHATSAPP_TOKEN ,
        "to": "",
        "video":`${req.body.url}`,
        "caption": `${req.body.message}`
    }
    };
    
    allUsers.forEach(function(user) {
      options.form.to = user.phone;
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(`Message sent to `);
        res.json({"success":true})
      });
    });
   
  }else{
    var options = {
      method: 'POST',
      url: `https://api.ultramsg.com/${process.env.INSTANCE_ID}/messages/image`,
      headers: {'content-type': ' application/x-www-form-urlencoded'},
      form: {
        "token":process.env.WHATSAPP_TOKEN ,
        "to": "",
        "image": `${req.body.url}`,
        "caption": `${req.body.message}`
    }
    };
    
    allUsers.forEach(function(user) {
      options.form.to = user.phone;
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(`Message sent to `);
        res.json({"success":true})
      });
    });
  }
   
  }

module.exports = {
  Login,
  replay,
  SendMessageToUser,
  getAllUsers,
  FetchAllUsers
 
};
