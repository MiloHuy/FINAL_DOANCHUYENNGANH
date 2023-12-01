import express from "express";
import admin from "./routes/admin.js";
import auth from "./routes/auth.js";
import topic from "./routes/topic.js";
import user from "./routes/user.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { authorizeRoles, isAuthenticatedUser } from "./middlewares/auth.js";

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/topics", topic);
app.use("/api/v1/admin", isAuthenticatedUser, authorizeRoles("admin"), admin);
// app.use('/api/v1/admin', admin);
app.use("/api/v1/users", user);
app.use("/api/v1/auth", auth);

export default app;
