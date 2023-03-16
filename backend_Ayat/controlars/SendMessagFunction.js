
require("dotenv").config();
var request = require("request");

const SendMessage = (phone,body)=>{
  var options = {
    method: "POST",
    url: `https://api.ultramsg.com/${process.env.INSTANCE_ID}/messages/chat`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      token: process.env.WHATSAPP_TOKEN,
      to:`+2${phone}`,
      body:body
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

module.exports = {
    SendMessage
}