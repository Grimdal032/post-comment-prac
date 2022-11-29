const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: String,  
    required: true,     // 값이 있어야 하는 속성값 설정
  },
  password: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model("Posts", postSchema);

//      {  
//     "user": "Developer",  
//     "password": "1234",  
//     "title": "안녕하세요", 
//     "content": "안녕하세요 content 입니다."
//     }