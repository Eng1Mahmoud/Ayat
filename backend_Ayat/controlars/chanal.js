require("dotenv").config();
const  mongoose  = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const telegramToken = process.env.telegramToken;
const bot = new TelegramBot(telegramToken, { polling: true });
const ID_Ayat = require("../models/Id_Ayat")
const ID = mongoose.model("idchanal", ID_Ayat);
const { getAyah } = require("./findAya");
const send = async ()=>{

  try {
    const id_Aya = await ID.findOne({});
    console.log(id_Aya);
    const ayah = await getAyah(id_Aya.id);

   bot.sendMessage(
            process.env.ChanalID,` السلام عليكم ورحمة الله وبركاته  🥰🌿
            
الاية ${ayah.ayah_number} من سورة  ${ayah.sura} 👇
      
${ayah.verse}
      
تفسير الاية 👇🌼
              
${ayah.tafsere} 
              
تفسير السعدي ❤`
          
          ).then(()=>{
             console.log("send")
             ID.findOneAndUpdate({},{ $inc: { id: 1 } }).then(()=> console.log("updated"))
          }
          ) 

  
  }
  catch(e){
    console.error(e.message);
  }
   
}
module.exports = send;

