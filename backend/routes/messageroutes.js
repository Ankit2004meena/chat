import express from "express";
import {getMessages,sendMessage} from "../Controller/messageController.js"
import protectRoute from "../middle/protectRoutes.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;