const mongoose = require("mongoose");
const verses = require("../models/verses");
const versesModel = mongoose.model("verses", verses);

const getAyah = async (id) => {
  try {
    const ayah = await versesModel.findOne({ id: id });
    return ayah;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAyah,
};
