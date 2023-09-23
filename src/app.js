import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import authRouter from "./routes/auth.js";
import serviceRequestRouter from "./routes/serviceRequest.js";
import profileRouter from "./routes/profile.js";
import feedbackRouter from "./routes/feedback.js";
import connectRedis from "connect-redis";
import { redisConnect } from "./config/redis.js";
import cookieConfig from "./config/cookieConfig.js";

const app = express();
const redisStore = new connectRedis({
  client: await redisConnect(),
});

app.use(morgan("dev"));
const sessionConfig = {
  name: "sid",
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.PRIVATE_KEY,
  proxy: true,
  cookie: { ...cookieConfig, maxAge: 1000 * 60 * 30 },
};
app.use(session(sessionConfig));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/service-request", serviceRequestRouter);
app.use("/api/profile", profileRouter);
app.use("/api/feedback", feedbackRouter);

export default app;
