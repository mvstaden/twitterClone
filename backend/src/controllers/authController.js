import { generateTokenAndCookie } from "../lib/utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerNewUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    //Create salt for password
    const salt = await bcrypt.genSalt(10);

    //Hashing password
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({ data: newUser });
    } else {
      return res.status(400).josn({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error creating user");
    res.status(500).json({ message: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("auth_token", "", { maxAge: 0 });
    res.status(200).json({ message: error.message });
  } catch (error) {
    console.log("Error logging out");
    res.status(500).json({ message: "Internal server error" });
  }
};
