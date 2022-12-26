const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authentication = require("../authenticate/authenticate");
const cors = require("cors")

const route = express.Router();
route.use(bodyParser())

route.use("/", authentication);
route.use(cors())

route.get("/", (req,res)=>{
    res.status(200).json({
        message:"hii from dashboard"
    })
})

module.exports = route;