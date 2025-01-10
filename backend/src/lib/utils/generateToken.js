import jwt from "jsonwebtoken";

export const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "15d",
  });
  res.cookie("auth_token", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60,
    secure: process.env.NODE_ENV !== "development",
  });
};
