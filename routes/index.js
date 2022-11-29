const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post.js");

// 게시글 조회
router.get("/posts", async (req, res) => {
    const posts = await Posts.find();
    res.status(200).json({
        data: posts.map((posts) => ({
            postId: posts._id,
            user: posts.user,
            title: posts.title,
            createdAt: posts.createdAt
        })).reverse(),
    }); 
});

// 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const posts = await Posts.find({_id: _postId});
        res.status(200).json({
            data : posts.map((list) => ({
                postId: list._id,
                user: list.user,
                title: list.title,
                content: list.content,
                createdAt: list.createdAt
            })),
        });
    } catch (err) {
        return res.status(400).json({ message : "데이터 형식이 올바르지 않습니다."})
    }
});

// 게시글 수정
router.put("/posts/:_postId", async (req, res) => {
    try { 
        const { _postId } = req.params;
        const { password, title, content } = req.body;
        const existslist = await Posts.find({_id: _postId});
        if (existslist.length) {
            if(existslist[0].password == password) {
                await Posts.updateOne({ _id: _postId }, { $set: {title} }, { $set: {content} });
                return res.status(200).json({message: "게시글을 수정하였습니다."});
            }else {
                return res.status(400).json({message: "비밀번호가 틀렸습니다."});
            }
        } else {
            return res.status(400).json({message: "게시글 조회에 실패하였습니다."});
        }
    } catch (err) {
        return res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
    }
});

// 게시글 삭제
router.delete("/posts/:_postId", async (req, res) => {
    try { 
        const { _postId } = req.params;
        const { password } = req.body;
        const existslist = await Posts.find({_id: _postId});
        console.log(existslist);
        if (existslist) {
            if(existslist[0].password == password) {
                console.log(existslist[0].password, "ture", password);
                await Posts.deleteOne({ _id: _postId });
                return res.status(200).json({message: "게시글 삭제 완료"});
            }else {
                return res.status(400).json({message: "비밀번호가 틀렸습니다."});
            }
        } else {
            console.log("false");
            return res.status(400).json({message: "게시글 조회에 실패하였습니다."});
        }
    } catch (err) {
        return res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
    }
});

module.exports = router;