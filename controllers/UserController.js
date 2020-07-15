const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
              .catch((err) => {
                console.log(err);
                return res
                  .status(500)
                  .json({ server: "Internal server error" });
              });
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
          return res.status(400).json({ username: "Wrong username" });
        }
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              username: user.username,
              userID: user._id,
              createdAt: user.createdAt,
            };
            // return res.json(userData);

            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 31556926,
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            return res.status(403).json({ password: "Wrong password" });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ server: "Internal server error" });
      });
  },
  getAllUsers: (req, res) => {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ server: "Internal server error" });
      });
  },
};

module.exports = user;
