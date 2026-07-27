const express = require("express");
const userRouter = express.Router();

const User = require("../models/user");

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

// Get all the pending connnection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connnectionRequests =  await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            data:  { status: "interested" },
        })

        res.json({message:"data fetched successfully"});
        data:connnectionRequests;
        console.log(connnectionRequests);


    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})

module.exports = userRouter;