const express = require('express');
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
const auth = require("../middleware/auth");
// const { check, validationResult } = require("express-validator");

const Payment= require("../models/Payment");

const User = require("../models/User");



//@route        POST api/WaterPrice
//@desc         Register a Water price
//@ access      PRIVATE
router.post('/', (req,res) => {
    res.send('Register a water price');
});

//get all payments made for particular bus user
//@route        GET api/WaterPrice
//@desc         Get all payments
//@ access      PRIVATE
// router.get('/', (req,res) => {
//     res.send('get all payments made by a particular user');
// });
//get all payments made by a particular user
router.get("/admin", auth, async (req, res) => {
    try {
      //get the comapny name from the admin
      const user = await User.findOne({ admin: req.admin.id });
      if (!user) {
        return res.status(404).json({ msg: "Admin not found" });
      }
      //get the company name
      const CompanyName = user.CompanyName;
      const payments = await Payment.find({ CompanyName });
      if (!payments) {
        return res.status(404).json({ msg: "No payments made" });
      }
      //send back the payments made
      res.status(200).json(payments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


//get the payments for the user when he pays
router.get("/user", auth, async (req, res) => {
    try {
      //get the comapny name from the admin
      const user = await User.findOne({ user: req.user.id });
      // if (!user) {
      //   return res.status(404).json({ msg: "User not found" });
      // }
      //get the company name
      const CompanyName = user.CompanyName;
      const payments = await Payment.find({ CompanyName });
      if (!payments) {
        return res.status(404).json({ msg: "No payments made" });
      }
      //send back the payments made
      res.status(200).json(payments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });





module.exports = router;