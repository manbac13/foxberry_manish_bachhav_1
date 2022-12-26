const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ecom");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute")
const dashRoute = require("./routes/dashRoute")
const app = express(); 
const cors = require("cors")

app.use(bodyParser())
app.use("/register", registerRoute)
app.use("/login", loginRoute)
app.use("/dashboard", dashRoute)
app.use(cors())


app.listen(8080, ()=>{
    console.log("Server is up on port 8080")
})