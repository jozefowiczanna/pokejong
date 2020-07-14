const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const user = {
  registerUser: (req, res) => {
    console.log(req.body.username);
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res.status(400).json({ username: "Username already exists" });
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            console.log(hash);
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },
  loginUser: (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          return res.status(400).json("Wrong username");
        }
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const userData = {
              username: user.username,
              userID: user._id,
              createdAt: user.createdAt,
            };
            return res.json(userData);
          } else {
            return res.status(400).json({ password: "Wrong password" });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error");
      });
  },
  getAllUsers: (req, res) => {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error");
      });
  },
};

module.exports = user;
