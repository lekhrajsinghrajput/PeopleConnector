const express = require("express");
const route = express.Router();
const gravatar = require("gravatar");
const User = require("../../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //to generate jsonwebtokens
const passport = require("passport");
const secretOrKey = require("../../config/jwtconfig").secretOrKey;
const expires = require("../../config/jwtconfig").expires;

//importing register validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//@route    GET /api/users/test
//@desc     test route
//@access   Public
route.get("/test", (req, res) => {
  res.json({ msg: "user works" });
});

//@route    POST /api/users/register
//@desc     Register a user
//@access   Public
route.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check basic validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default image
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              return res.json(user);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});

//@route    POST /api/users/login
//@desc     Login a user
//@access   Public

route.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);
  //check for validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: email }).then(user => {
    if (user) {
      //compare the hashed password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //jwt token generation
          //payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          //sign token
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: expires },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      });
    } else {
      errors.email = "Email not found";
      return res.status(400).json(errors);
    }
  });
});

//@route    POST /api/users/current
//@desc     Returning a current user
//@access   Private
route.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = route;
