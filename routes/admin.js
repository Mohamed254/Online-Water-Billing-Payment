const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");


const Admin = require("../models/Admin");
const User = require("../models/User");
const auth = require("../middleware/auth");

//get
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({ admin: req.admin.id }).sort({
      date: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route    POST api/users
// @desc     Register a admin
// @access   Public
router.post(
  "/",
  [
    check("name", "Please add Name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res.status(400).json({ msg: "Admin already exist" });
      }

      admin = new Admin({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      // res.send("User saved");

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



//add a user or register a user
router.post(
  "/add",
  [auth, [check("firstname", "Fisrtname is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, phone, address, password } = req.body;

    try {
      const newUser = new User({
        firstname,
        lastname,
        email,
        phone,
        address,
        password,
        admin: req.admin.id
      });

      const user = await newUser.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


//update user

router.put("/:id", auth, async (req, res) => {
  const { firstname, lastname, email, phone, address, password } = req.body;

  // Build contact object
  const userFields = {};
  if (firstname) userFields.firstname = firstname;
  if (lastname) userFields.lastname = lastname;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (address) userFields.address = address;
  if (password) userFields.password = password;
  

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Make sure user owns contact
    if (user.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //actual update
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//delete user
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "Contact not found" });

    // Make sure admin owns user
    if (user.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //actual Delete
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    POST api/admin
// @desc     Register a admin
// @access   Public
// router.post('/', (req,res) => {
//     res.send('Register a admin');
// });
// // @route    GET api/users
// // @desc     Get all users
// // @access   Private

// router.get('/', (req,res) => {
//     res.send('Get all users');
// });

// // @route    POST api/users
// // @desc     Add new user
// // @access   Private

// router.post('/', (req,res) => {
//     res.send('Add user');
// });

// // @route    PUT api/users/:id
// // @desc     Update users
// // @access   Private

// router.put('/:id', (req,res) => {
//     res.send('Update user');
// });

// // @route    DELETE api/user/:id
// // @desc     Delete  user
// // @access   Private

// router.delete('/:id', (req,res) => {
//     res.send('Delete user');
// });

module.exports = router;
