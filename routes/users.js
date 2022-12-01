const express = require('express');
const router = express.Router();
const Users = require("../schemas/user.js");

// 회원 생성
router.post("/user", async (req, res) => {
    try {
        console.log("create start");
        const { name, ID, pw } = req.body;
        const createdUsers = await Users.create({ name, ID, pw });

        res.json({ message: `회원 ${name} 님 반갑습니다.` });
    } catch (err) {
        return res.status(400).json({ massage : "데이터 형식이 올바르지 않습니다."});
    }
});

// 회원 목록 조회
router.get("/user", async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json({
            result: users.map((users) => ({
                userId: users._id,
                name: users.name,
                ID: users.ID,
                pw: users.pw
            })),
        });
    }catch(err) {
        return res.status(400).json({ message : "회원 목록 조회 실패"});
    }
});

// 회원 상세 조회
router.get("/user/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await Users.findOne({_id: userid});
        res.status(200).json({ result: {
            userId: user._id,
            name: user.name,
            ID: user.ID,
            pw: user.pw
        }});
    } catch (err) {
        return res.status(400).json({ message : "회원 상세 조회 실패"});
    }
});

module.exports = router;