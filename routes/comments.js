const express = require('express');
const router = express.Router();
const Comments = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");

// 댓글 작성
router.post("/comments/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const { user, password, content } = req.body;
        const syncTime = new Date().toISOString();
        const existslist = await Posts.findOne({_id: _postId});
        if((existslist !== null) && (content !== undefined)) {
            const createdComments = await Comments.create({ _postId, user, password, content, syncTime });
            res.status(200).json({ message: "댓글을 생성하였습니다." });
        }else {
            return res.status(400).json({ message: "댓글 내용을 입력해주세요."});
        }
    } catch (err) {
        return res.status(400).json({ massage : "데이터 형식이 올바르지 않습니다."});
    }
});

// 댓글 목록 조회
router.get("/comments/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const comments = await Comments.find({_postId: _postId});
        res.status(200).json({
            data: comments.map((comments) => ({
                commentId: comments._id,   
                user: comments.user,
                content: comments.content,
                createdAt: comments.createdAt,
            })).reverse()
        })
    } catch (err) {
        return res.status(400).json({ massage : "데이터 형식이 올바르지 않습니다."});
    }
});

// 댓글 수정
router.put("/comments/:_commentId", async (req, res) => {
    try {
        const { _commentId } = req.params;
        const { password, content } = req.body;
        const existComment = await Comments.findOne({_id: _commentId});
        console.log(existComment[0].password);
        console.log(content, password);

        if(existComment !== null) {
            if(content == undefined) { 
                return res.status(400).json({massage: "댓글 내용을 입력해주세요."});
            }else if(password == existComment[0].password){
                await Comments.updateOne({_id: _commentId}, {$set: {content}});
                return res.status(200).json({message: "댓글을 수정하였습니다."})
            }else {
                return res.status(400).json({message: "비밀번호가 틀렸습니다."});
            }
        }else {
            return res.status(400).json({message: "댓글 조회에 실패하였습니다."});
        }
    } catch (err) {
        return res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
    }
})

// 댓글 삭제
router.delete("/comments/:_commentId", async (req, res) => {
    try {
        const { _commentId } = req.params;
        const { password } = req.body;
        const existComment = await Comments.find({_id: _commentId});
        if(existComment > 0) {
            if(password == existComment[0].password) {
                await Comments.deleteOne({_id: _commentId});
                return res.status(200).json({message: "댓글을 삭제하였습니다."})
            }else {
                return res.status(400).json({message: "비밀 번호가 틀렸습니다.."});
            }
        }else {
            return res.status(400).json({message: "댓글 조회에 실패하였습니다."});
        }
    } catch (err) {
        return res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
    }
})

module.exports = router;