const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
 try {
   // Read the token from the request coookies

   const cookies = req.cookies;

   const {token} = cookies;
   if(!token){
     throw new Error("Token in not  Valid !!!!!");
   }

   const decodedObj = await jwt.verify(token,"DEV@Tinder$26");

   const {_id} = decodedObj; 

   // Find the user
   const user = await User.findById(_id);
   if(!user){
     throw new Error("User not found");
   }
   req.user = user;
   next(); // to move to request handler
 
   
    
 } catch (err) {
    res.status(400).send("Error: "+err.message);
 }

};

module.exports = {
  userAuth,
};
