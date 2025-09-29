import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT || 3000;

import authRoutes from "./routes/auth.routes.js";

// Enable CORS for frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Parse JSON bodies
app.use(express.json());

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
