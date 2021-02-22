const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const Admin = require("../models/Admin");



// @route    GET api/auth
// @desc     Get logged in user
// @access   Private


//getting the user
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});



//getting the admin
router.get("/admin", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


// @route    GET api/auth
// @desc     Auth user & get token
// @access   Public


//post request for the user

router.post(
  "/user",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Please check your entries and try again" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Please check your entries and try again" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

//post request for the admin

router.post(
    "/admin",
    [
      check("email", "Please include a valid email").isEmail(),
      check("password", "Password is required").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let admin = await Admin.findOne({ email });
  
        if (!admin) {
          return res.status(400).json({ msg: "Please check your entries and try again" });
        }
  
        const isMatch = await bcrypt.compare(password, admin.password);
  
        if (!isMatch) {
          return res.status(400).json({ msg: "Please check your entries and try again" });
        }
  
        const payload = {
          admin: {
            id: admin.id
          }
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
      }
    }
  );




// @route    GET api/auth
// @desc     Get logged in admin
// @access   Private

// router.get('/', (req, res) => {
//     res.send('Get logged in admin');
// });

// // @route    GET api/auth
// // @desc     Auth admin & get token
// // @access   Public

// router.post('/', (req,res) => {
//     res.send('Log in admin');
// });

  

module.exports = router;