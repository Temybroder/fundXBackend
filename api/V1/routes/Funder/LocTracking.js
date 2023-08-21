const express = require('express');
const router = express.Router();
const db = require()
// const bcrypt = require('bcryptjs');

//ROUTES

// FUNDER ROUTE
// Route for funder to Update their location. 
// NOTE: THIS ROUTE IS CALLED VERY FREQUENTLY
router.put('/upd_fdA_L/:id', (req, res)=> {
    const funderLoc = req.body.locationObject;
    if(!funderLoc){
        return res.status(401).json('Error: bad data');
        }
        db.funderActivity.update({_id: mongodb.ObjectId(req.params.id)}),
        {$set: {longitude: funderLoc.cordinates.longitude, acceptanceStatus: "funderAccepted"}}, function (err, updatedDetails){
            if (err){
                res.status(400).json(err);
            } else {
                const fundingOrder = updatedDetails;
                io.emit(fundingOrder.UserSocketId + "AcceptedFunding", fundingOrder)
                res.status(200).json(fundingOrder);
            }
        }
});


// USER ROUTE
// Get Funder's (FunderActivity) Present location
router.get('/cf_ploc/:id', (req, res) => {
    db.funderActivity.findById({_id: mongodb.ObjectId(req.params.id)})
    .then(funderActivity => {
        if(funderActivity.Location){
            return res.status(200).json(data = {funderActivity})
        } else {
            return res.status(203).json(data = {"NullLocation": "No Funder Location Data"})
        }
    })
    .catch(err => {
        res.status(400).send('Error processing request')
    })
})

router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

module.exports = router;  