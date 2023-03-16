const mongoose = require("mongoose");
const userschema = require("../models/userSchema");
let users = mongoose.model("users", userschema);
let localStorag = require("local-storage");
const  {SendMessage} = require("./SendMessagFunction")
const SignUp = (req, res) => {
  const phone = req.body.phone;
  users
    .findOne({ phone: phone })
    .then((user) => {
      if (user) {
        res.json({ exist: true, message: "user already exists" });
      } else {
        res.json({ exist: false });
        console.log(req.body);
        const verification_code = Math.random()
          .toString(10)
          .substring(2, 2 + 4);
          SendMessage(phone,` كود التحقق الخاص بك هو   ${ verification_code}`);
          localStorag.set("verification_code", verification_code); 
        localStorag.set("user", req.body);
         
      
      }
    })
    .catch((err) => console.log(err.message));
};

const verification = (req, res) => {
  if (req.body.code === localStorag.get("verification_code")) {
    res.json({
      verification: true,
      message: "تم انشاء الحساب بنجاح",
      user: localStorag.get("user"),
    });
    const user = new users(localStorag.get("user"));
    SendMessage(user.phone,` السلام عليكم ورحمة الله وبركاته  ${user.name.split(" ")[0]} 🥰  لقد تم الاشتراك بنجاح في خدمة ايات`);
    user.save().then((result) => {
      console.log("User added", result);
      
    });
  } else {
    res.json({ verification: false });
  }
};
module.exports = {
  SignUp,
  verification,
};
