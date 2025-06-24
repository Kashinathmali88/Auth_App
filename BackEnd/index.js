import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dbConnect from "./db.js";
import User from "./model.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auth-app-frontend-woad.vercel.app",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  if (!user) {
    return res.json({ success: false, message: "Faild to create user" });
  }
  return res.json({ success: true, message: "User signed up" });
});

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }
    const decoded = jwt.verify(token, "kashinathmali");

    req.id = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({ success: false, message: "Invalide credential" });
  }
  //create token
  const token = jwt.sign({ id: user._id }, "kashinathmali", {
    expiresIn: "1d",
  });
  //create option for cookie
  const option = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "None",
    domain: ".vercel.app",
  };
  res.cookie("token", token, option);
  return res.json({ success: true, message: "User logged in", token });
});

app.get("/isAuth", auth, (req, res) => {
  res.json({ success: true, id: req.id, message: "Auth successfully" });
});

app.get("/me", auth, async (req, res) => {
  const _id = req.id;
  const user = await User.findById({ _id }).select("-password");
  if (!user) {
    return res.json({ success: false, message: "No user found with is id" });
  }
  res.json({ success: true, user });
});

app.get("/logOut", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "None",
    domain: ".vercel.app",
  });
  return res.json({ success: true, message: "Logged out successfully" });
});

app.get("/", (req, res) => {
  res.send("Api working");
});

dbConnect();
app.listen(3000, () => {
  console.log("app on 3000");
});
