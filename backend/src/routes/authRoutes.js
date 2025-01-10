import express from "express";
import { logOut, registerNewUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/logout", logOut);
export default router;
