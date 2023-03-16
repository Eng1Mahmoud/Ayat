const mongoose = require("mongoose");

// defining schema

const verses = mongoose.Schema({
    sura:String,
    sura_index:Number,
    ayah_number:Number,
    verse:String,
    tafsere:String,
    author:String,
    id:Number
});
module.exports = verses;
