const userModel = require("../models/userModel").userModel;
const database = require('../models/userModel').database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

// the github one
const getUserByGitHubIdOrCreate = (profile) => {
  try {
    let user = userModel.findById(profile.id);
    if (user) {
      return user;
      }
  } catch(err) {
    database.push({
      id: profile.id,
      name: profile.username,
      role: "user"
      })
    console.log("Added to database")
  }
}

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
