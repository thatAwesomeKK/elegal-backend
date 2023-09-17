import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();

import authRouter from "./routes/auth.js";
import serviceRequestRouter from "./routes/serviceRequest.js";
import profileRouter from "./routes/profile.js";

app.use(morgan("dev"));
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/service-request", serviceRequestRouter);
app.use("/api/profile", profileRouter);

export default app
