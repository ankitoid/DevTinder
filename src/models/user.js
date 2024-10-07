const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {

  const user = this;
  
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$26", {
    expiresIn: "1h",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {

  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  ); // this.password is the hashed password stored in the database

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
