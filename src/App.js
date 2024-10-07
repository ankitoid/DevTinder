const express = require("express");
const connectDB = require("./Config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const { userAuth } = require("./middleware/auth");

app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validation of the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encryption of the password
    const passwordHash = await bcrypt.hash(password, 8);
    console.log(passwordHash);
    // saving the data to the database

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // creating a new instance

    await user.save();
    res.send("user added sucussfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// feed api to get all the users from the database
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.findOne({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const Allowed_Updates = ["firstName", "lastName", "password", "gender"];

    console.log("Request Body:", data);

    const isUpdateAllowed = Object.keys(data).every((key) =>
      Allowed_Updates.includes(key)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid updates!");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    console.log("Updated User:", user);
    res.send("User updated successfully!");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error updating user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    console.log("Connectin request is send");
    res.send("Connection request sent");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is sucessfully started on port 3000");
    });
  })
  .catch((err) => {
    console.error("databse is not connected");
  });
