const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  _postId: {
    type: String,
    required: true,
  },
  user: {
    type: String,  
    required: true,     // 값이 있어야 하는 속성값 설정
  },
  password: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model("Comments", commentSchema);