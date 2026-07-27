const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password,gender } = req.body;
    // Encryption of the password
    const passwordHash = await bcrypt.hash(password, 8);
    console.log(passwordHash);
    // saving the data to the database

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
    }); // creating a new instance

    await user.save();
    res.send("user added sucussfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find user by emailId
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid Cridentials");
    }

    // Compare the password provided with the stored password hash
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a jwt token
      const token = await user.getJWT();

      // Add the token to cookies and send the response

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login successful");
    } else {
      return res.status(400).send("Invalid Cridentials");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    try {
      // Clear the token cookie (JWT)
    //   res.clearCookie("token");
      
    //   // Send a success message
    //   res.send("Logout successful");

    //   //other way to logout

      res.cookie("token",null, {
        expires: new Date(Date.now()),
      })
      res.send("Logout successful");
    

    } catch (err) {
      // Handle any errors during logout
      res.status(400).send("Something went wrong: " + err.message);
    }
});


  

module.exports = authRouter;
