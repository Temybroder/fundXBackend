const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const db = require('../../../../vars/db');

//ROUTES


router.get('/', (req, res, next) => {

});

// Route to update Funder's earning
router.put('/fearn/:id', async (req, res, next) => {
    let queryId = id;
    Earnings.findByIdAndUpdate(queryId, {
        $set : {
            amountEarned : req.body.amount
        }
    }, { new: true }, function (err, result) {
        if (err){
            res.status(400).json(data = {status : err});
            return;
           } else {
               res.status(200).json(data = {result});
               return;
           }
    }
    )
});

router.get('/', (req, res, next) => {

});

module.exports = router;  