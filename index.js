import "dotenv/config.js";
import { createServer } from "http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();
const server = createServer(app);

import { connectToMongo } from "./src/config/db.js";
import authRouter from "./src/routes/auth.js";
import serviceRequestRouter from "./src/routes/serviceRequest.js";
import profileRouter from "./src/routes/profile.js";

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/service-request", serviceRequestRouter);
app.use("/api/profile", profileRouter);

//serves the application at the defined port if Connected to MongoDB
connectToMongo()
  .then(() => {
    try {
      server.listen(PORT, () => {
        console.log("Connected to MongoDB");
        console.log(`Server is running on : http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot Connect to Server");
    }
  })
  .catch((e) => {
    console.log("Error In Connecting to Server!");
  });
