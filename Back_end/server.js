import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

import Admin from "./Routes/Admin.js";
import User from "./Routes/User.js";
import Service from "./Routes/Service.js";
import Package from "./Routes/Package.js";
import Order from "./Routes/Order.js";
import authRoutes from './Routes/auth-routes.js';
import passportSetup from "./Middlewares/Oauth.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent from the frontend

}));

// Session middleware setup
app.use(
  session({
    secret: "codi digit grow",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and use Passport session middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
passportSetup();

// Routes
app.use("/images", express.static("images"));
app.use("/api/admin", Admin);
app.use("/api/user", User);
app.use("/api/package", Package);
app.use("/api/order", Order);
app.use('/auth', authRoutes);
app.use("/api/service", Service);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connected and Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
