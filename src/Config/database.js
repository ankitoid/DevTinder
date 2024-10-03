const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ankitsingh:D5Jdvf3oGsJEDFIV@cluster0.bwbcf.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
