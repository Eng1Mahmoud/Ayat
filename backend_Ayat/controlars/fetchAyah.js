const { getAyah } = require("./findAya");
const { FetchAllUsers } = require("./admin");
var request = require("request");
const mongoose = require("mongoose");
require("dotenv").config();
const ID_Ayat = require("../models/Id_Ayat");
const ID = mongoose.model("idayahs", ID_Ayat);
const fetchAyah = async () => {
  try {
    const id_Aya = await ID.findOne({});

    console.log(id_Aya);
    const allUsers = await FetchAllUsers();
    const ayah = await getAyah(id_Aya.id);
    const message = ` *السلام عليكم ورحمة الله وبركاته*  🥰🌿
الاية ${ayah.ayah_number} من سورة *${ayah.sura}* 👇
*${ayah.verse}*
 *_تفسير الاية_* 👇🌼
  
 ${ayah.tafsere} 
  
  *تفسير السعدي* ❤️
  `;

    var options = {
      method: "POST",
      url: `https://api.ultramsg.com/${process.env.INSTANCE_ID}/messages/image`,
      headers: { "content-type": " application/x-www-form-urlencoded" },
      form: {
        token: process.env.WHATSAPP_TOKEN,
        to: "",
        image:
          "https://i.ibb.co/nr7QgQ1/pexels-rodnae-productions-7249183-1.jpg",
        caption: `${message}`,
      },
    };

    allUsers.forEach(function (user) {
      options.form.to = `+2${user.phone}`;
      options.form.caption = ` ${user.name.split(" ")[0]}${message}`;
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      });
    });
    ID.findOneAndUpdate({},{ $inc: { id: 1 } }).then(()=> console.log("updated"))
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchAyah;
