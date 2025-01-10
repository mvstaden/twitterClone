import express from "express";
import {
  logOut,
  registerNewUser,
  userLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", userLogin);
router.post("/logout", logOut);
export default router;
