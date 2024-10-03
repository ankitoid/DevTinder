const express = require("express");
const connectDB = require('./Config/database');
const app = express();

const User = require("./models/user");

app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "ViratKohli@gmail.com",
        password : "virat@123",
    }); // creating a new instance 

    try{ 
        await user.save(); 
        res.send("user added sucussfully") ;
    }
   catch(err){
        res.status(400).send("Error saving the user:" + err.message)
   } 
})

connectDB().then(() => {
    console.log("Database connected");
    app.listen(3000,() => { 
        console.log("Server is sucessfully started on port 3000");
    });
}).catch(err => {
    console.error("databse is not connected");
})

