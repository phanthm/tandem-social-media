import express from "express";
import passport from "passport";

import User from "../model/user.model.js";

const router = express.Router();

const url = process.env.FRONTEND_URL;

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failed" }),
  async (req, res) => {
    const user_id = req.user.id;

    const user = await User.findOne({ user_id });

    if (!user) {
      const new_user = new User({
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.emails[0].value,
        photo: req.user.photos[0].value,
      });

      try {
        await new_user.save();
        console.log(new_user);
      } catch {
        console.log("failed to save user details");
      }
    }

    res.redirect(`${url}/`);
  },
);

router.get("/failed", (req, res) => {
  res.redirect(`${url}/login?error=auth_failed`);
});

// Get current user info (for frontend)
router.get("/user", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.emails[0].value,
        photo: req.user.photos[0].value,
      },
    });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

// A protected route, accessible only after login
router.get("/profile", isLoggedIn, (req, res) => {
  res.send(
    `<h1>Hello ${req.user.displayName}!</h1><img src="${req.user.photos[0].value}" alt="Profile Picture"><br><a href="/auth/logout">Logout</a>`,
  );
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error logging out" });
    }
    req.logout(() => {
      res.redirect(`${url}/login`);
    });
  });
});

export default router;
