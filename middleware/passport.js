const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const userController = require("../controllers/userController");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

// code from passport.js
const gitHubLogin = new GitHubStrategy(
  {
    clientID: 'e83c5205c779d110d797',
    clientSecret: 'e1fb519b256b5599387243a8817ab2137274a4ba',
    callbackURL: 'http://localhost:8000/auth/github/callback',
  },
  function (accessToken, refreshToken, profile, cb) {
    let user = userController.getUserByGitHubIdOrCreate(profile)
    return cb(null, user);
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
module.exports = passport.use(gitHubLogin);