const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ecom");
const registerdUsers = require("../models/register")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "secret"
const cors = require("cors")

const route = express.Router();
route.use(bodyParser())
route.use(cors())

route.get("/", (req, res) => {
    res.send("hello from login page")
})

route.post("/", body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const suspect = await registerdUsers.findOne({ email: req.body.email });
        if (!suspect) {
            return res.status(400).json({
                status: "failed",
                message: "No user exists, kindly register"
            })
        }
        const email = req.body.email;
        const password = req.body.password;

        bcrypt.compare(password, suspect.password, function (err, result) {
            // result == true
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "wrong password"
                })
            }
            if (result) {
                const token = jwt.sign({
                    data: email,
                }, secret, { expiresIn: '3d' });

                res.status(200).json({
                    status:"success",
                    message:"Login Successfull",
                    email, 
                    token
                })
            }
            else{
                res.status(400).json({
                    status:"success",
                    message:"Login Unsuccessful",
                }) 
            }

        });

    } catch (error) {
        res.status(400).json({
            status:"success",
            message:error.message,
        }) 
    }
})

module.exports = route;