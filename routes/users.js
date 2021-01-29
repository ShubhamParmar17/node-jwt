const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// register route
router.post("/register", async (req, res) => {
  // Validating user data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("That email already exists.");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// login route
router.post("/login", async (req, res) => {
  // Validating user data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email  exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email is wrong.");
  } else {
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      return res.status(400).send("Password is wrong.");
    }

    // Create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  }
});

module.exports = router;
