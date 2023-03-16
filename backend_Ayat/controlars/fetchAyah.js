const { getAyah } = require("./findAya");
const localStorag = require("local-storage");
const { FetchAllUsers } = require("./admin");
var request = require("request");
require("dotenv").config();
const fetchAyah = async () => {
  try {
    const allUsers = await FetchAllUsers();
    const ayah = await getAyah(localStorag.get("id"));
    const message = ` *السلام عليكم ورحمة الله وبركاته*   🥰🌿

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
      options.form.caption = ` ${user.name}${message}`;
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      });
    });
    localStorag.set("id", localStorag.get("id") + 1);
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchAyah;
