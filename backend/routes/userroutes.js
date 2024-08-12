import express from "express";
import protectRoute from "../middle/protectRoutes.js";
import { getUsersForSidebar } from "../Controller/userController.js";

const router = express.Router();
// in following first protectRoute will run then we write next() at the end of protectRoute to run getUserForSidebar
router.get("/", protectRoute, getUsersForSidebar);

export default router;