const {SendMessage} = require("./SendMessagFunction")
require("dotenv").config();

const MessageUser = (req, res) => {
 
  try{
    SendMessage("01201453941", `${req.body.message} رسالة من ${req.body.name} ${req.body.phone}`)
    res.json({ message: " لقد تم ارسال الرسالة بنجاح سيتم الرد عليك في اسرع وقت ممكن", added: true });
  }
   catch(err){
    res.status(500).json({ message: "لقد حدث خطا ما ", added: false });
   }
    

};


module.exports = {
  MessageUser,

}



