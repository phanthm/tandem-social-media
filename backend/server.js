// app.js

// 1. Imports and Basic Setup
// require("dotenv").config();
// const express = require("express");
// const passport = require("passport");
// const session = require("express-session");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT || 3000;

import authRoutes from "./routes/auth.routes.js";

// 2. Session Management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if you are using https
  }),
);

// 3. Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// 4. Configure Passport Google OAuth 2.0 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // This function is called after successful authentication.
      // 'profile' contains the user's Google profile information.
      // In a real app, you would find or create a user in your database.
      console.log(profile);
      return done(null, profile);
    },
  ),
);

// 5. Serialize and Deserialize User
// This determines what user information should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user);
});

// This retrieves the user information from the session.
passport.deserializeUser((user, done) => {
  done(null, user);
});

// 6. Define Routes
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.use("/auth", authRoutes);

// 7. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
