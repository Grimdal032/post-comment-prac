const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post.js");

// 게시글 작성
router.post("/posts", async (req, res) => {
    try {
        const { user, password, title, content } = req.body;
        const syncTime = new Date().toISOString();
        const createdPosts = await Posts.create({ user, password, title, content, syncTime });

        res.json({ message: "게시글을 생성하였습니다." });
    } catch (err) {
        return res.status(400).json({ massage : "데이터 형식이 올바르지 않습니다."});
    }
});



module.exports = router;