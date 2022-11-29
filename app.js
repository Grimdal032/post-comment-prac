const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const connect = () => {
    mongoose
      .connect("mongodb://127.0.0.1/personal_project")
      .catch(err => console.log(err));
  };
mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});
connect();

app.use(express.json());

const postsRouter = require("./routes/posts.js");
const listsRouter = require("./routes/index.js");
const commentRouter = require("./routes/comments.js");
app.use("/api", [postsRouter, listsRouter, commentRouter]);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});


