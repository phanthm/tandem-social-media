import express from "express";
import passport from "passport";

const router = express.Router();

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
  (req, res) => {
    res.redirect("/auth/profile");
  },
);

router.get("/failed", (req, res) => {
  res.send("<h1>Log in failed!</h1>");
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
      return res.send("Error logging out");
    }
    req.logout(() => {
      res.redirect("/");
    });
  });
});

export default router;
