const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ecom");
const registerdUsers = require("../models/register")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const cors = require("cors")

const route = express.Router();
route.use(bodyParser())
route.use(cors())

route.get("/", async(req, res) => {
    const allUsers = await registerdUsers.find();
    res.json({
        allUsers
    })
})

route.post("/", body('email').isEmail(), body('name').isString(), body('phoneNumber').isNumeric(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const password = req.body.password;
        bcrypt.hash(password, 10, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                return res.status(400).json({
                    status:"failed",
                    message:err.message
                })
            }

            const user = await registerdUsers.create({
                name:req.body.name,
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                password:hash
            })

            res.status(200).json({
                status:"success",
                message:"User Registered Successfully",
                user
            })
        });

    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = route;