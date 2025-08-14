const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ani#74fauji@98$[-&-]z_';
const fetchUser = require('../middlewares/fetchUser.js');


// Create user route with password hashing
router.post(
  "/createUser",
  [
    body("name", "Name must contain minimum 5 letters").isLength({ min: 5 }),
    body("password", "Password must have minimum 5 letters").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Checking for the errors during giving input
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Checking if there is another person with same email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: `User with email ${req.body.email} already exists` });
      }
      // adding salt to our password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const example = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(example, SECRET_KEY);
      res.json({ jwtToken: token, USER: user });
    } catch (err) {
      res.status(500).json({ error: "Server Error", message: err.message });
    }
  }
);



// Login route with bcrypt password comparison
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Checking if any errors 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // refactoring the email and passsword from req.body
    const { email, password } = req.body;

    try {
      // findwing the user on the same email for loging in
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      // using bcryptjs we are checking now the clientside password vs users's actual password 
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const example = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(example, SECRET_KEY);
      res.json({ message: `Congratulations ${user.name}, you are logged in!`, token: token });
    } catch (err) {
      res.status(500).json({ error: "Server Error", message: err.message });
    }
  }
);



// Creating the route to get info of the loggedin user
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(400).json({ error: 'User not found' }); 
    }
    res.status(200).json(user); 
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});


module.exports = router ;
