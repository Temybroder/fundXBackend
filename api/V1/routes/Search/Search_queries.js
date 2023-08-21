const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const db = require("../../models");

//ROUTES
// Search for User by Id to load card/ bank details, and Search for Users (agents) that match request criteria,
// to fulfill it.
// Then commence Paystack transaction IN-APP to process debits and credits according to requested transaction


// Search for all Fulfillers that are available within a certain distance from the Requester, and meet order criteria
// Payload required:
// transaction_type (withdrawal, deposit), amount, delivery_location (Home_delivery or choose_location), requester's _id
// 
router.post('/users/:page', function(req, res, next) {
  const page = req.params.page || 1
  const perPage = 20
  const filterAvailability = req.body.availability;
  const filterstate = req.body.state;
  if(filterAvailability !='' && filterstate !=''){

    const filterParameter = {$and:[{availability:filterAvailability}, {state:filterstate}]}
  } else if (
      filterAvailability !='' && filterstate ==''
  )   {
    const filterParameter = { availability:filterAvailability}
  }
  else if (
    filterstate !='' && filterAvailability ==''
)   {
  const filterParameter = { state:filterstate}
}else{
  const filterParameter = {}
};
  User
  .find(filterParameter)
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec(function(err, users) {
    User.count().exec(function(err, count) {

      if (err) return next(err)

      res.render('findlawyerm', {
        users,
        current: page,
        pages: Math.ceil(count / perPage)
    })
    })
  })
});


// Obtain Card and bank details of Requester and Fulfiller
// gfd - Get Financial Details
router.get("/gfd/:rid/:fid", (req, res, next) => {
  const _id_RequestedBy = req.params._rid;
  const _id_FulfilledBy = req.params._fid;
  try {
  // Obtain Card details of User making request
  db.User.findById(_id_RequestedBy)
  .populate('Card')
  .exec(function(error, requestingUser){
    if (error) {
       return res.status(400).json({error});
      next(); 
      }
      const _card_details = requestingUser.card;
            // Obtain Bank details of Agent to fulfill request
            db.User.findById(_id_RequestedBy)
            .populate('Bank_account')
            .exec(function(error, fulfillingUser){
                if (error) {
                return res.status(400).json({error});
                next(); 
                }
                const _bank_details = fulfillingUser.Bank_account;
                    res.status(200).json({_requesterCard: _card_details, _fulfillerDetails: _bank_details})
                }
            )
        }
    )
} 
  catch (error) {
      return res.status(400).json({error});
            }
        }
  )
  
// Route
router.get('/', (req, res, next) => {


});

// Route
router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

module.exports = router;  