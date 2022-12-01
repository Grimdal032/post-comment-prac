const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,  
    required: true,
  },
  ID: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  }
}, { versionKey: false });

module.exports = mongoose.model("Users", userSchema);