const express = require('express');
const router = express.Router();


//@route        POST api/reports
//@desc         Register reports
//@ access      PRIVATE
// router.post('/', (req,res) => {
//     res.send('Registe a report');
// });

//get all payments made for particular bus user
//@route        GET api/reports
//@desc         Get all reports
//@ access      PRIVATE
router.get('/', (req,res) => {
    res.send('get all reports for a particular user');
});
module.exports = router;