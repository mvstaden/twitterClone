import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./db/mongoDBConnect.js";

const port = process.env.PORT || 9001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectMongoDB();
  console.log(`Server running on localhost ${port}`);
});
