const express = require("express")

const app = express();

app.use("/",(req,res) =>{
    res.send("hello frm the server Dashboard")   // request handler
})

app.use("/test",(req,res) =>{
    res.send("hello frm the server")   // request handler
})

app.use("/hello",(req,res) =>{
    res.send("hello frm the server hello")   // request handler
})

app.listen(3000,() => {
    console.log("Server is sucessfully started on port 3000");
});