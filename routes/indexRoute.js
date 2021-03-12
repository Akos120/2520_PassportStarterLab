const express = require("express");
const { session } = require("passport");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
    user: req.user,
    });
});

router.get("/admin", isAdmin, (req, res) => {
  res.render("admin", {
    user: req.user,
    session: req.sessionStore
  });
});

router.post("/revoke/:i", isAdmin, (req, res) => {
  req.sessionStore.destroy(req.params.i.replace(":", ""), (err) => {
    if (err) {
      res.redirect("/")
    } else {
      res.redirect("/admin");
    }
  })
});

module.exports = router;
