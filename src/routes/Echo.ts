import { Request, Response, NextFunction } from "express";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "接続に成功しました"});
});

module.exports = router;
