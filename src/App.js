const express = require("express");
const connectDB = require('./Config/database');
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user = new User(req.body); // creating a new instance 

    try{ 
        await user.save(); 
        res.send("user added sucussfully!") ;
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
