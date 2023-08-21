const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const dbMain = require('../../../../vars/db');
const {authUser, authFunder, authAdmin, authSuperadmin} = require("../../middlewares/Authorization")

//ROUTES

// Route  for User to Update their location. 
// NOTE: THIS ROUTE IS SOMETIMES CALLED VERY FREQUENTLY
router.put('/upd_udA_L/:id', authUser, async (req, res)=> {
    const queryId = req.params.id;
    const userLoc = req.body.locationObject;
    if(!userLoc){
        return res.status(401).json('Error: bad data');
        }
        FundingOrder.findByIdAndUpdate(queryId, {
            $set: {
                longitude : userLoc.cordinates.longitude,
                latitude : userLoc.cordinates.latitude
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


// USER ROUTE
// Get User's (userActivity) Present location
router.get('/cu_ploc/:id', authFunder, async (req, res) => {
    const queryId = req.params.id;
    UserActivity.findById(queryId, (err, result) => {
        if(err){
            return res.status(400).send(err)
       } else {
        if(result){
            return res.status(200).json(data = {result})
        } else {
            return res.status(203).json(data = {"NullLocation": "No User Location Data"})
        }
       }
    })
})

router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

module.exports = router;  