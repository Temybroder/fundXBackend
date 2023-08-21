const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User= require('../../models/User');

//ROUTES

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

// Remove a User


// Delete User
router.delete('/delus', (req, res, next) => {
  let email = req.body.email;
  User.findOneAndDelete({UserEmail: email}, function(err, result){
    if(err){
      res.status(404).json({error: "Error Processing request"})
    } else {
      if(result){
        res.status(200).json(data = {"statusMessage": "Delete successful"})
        return;
    } else {
        res.status(400).json("Deletion not unsuccessful")
        return;
    } 
    }
  })
})



// //Delete Single User
// const deleteUser = async (req, res, next) => {
// 	try {
// 		await User.deleteOne({ _id: req.params.id })
// 		res.status(200).json({ "message": "User successfully deleted" })
//     return;
// 	} catch {
// 		next(ApiError.resourceNotFound('User not found.'));
//     return;
// 	}
// }

////////////////////// GUIDES FOR ROUTES   ////////////////////////


router.post("/update/:Id", ensureAuthenticated, function (req, res) {
	var Id = req.user.Id;
	User.findByIdAndUpdate(Id, 
    { $set: { name: req.body.name, 
      phone: req.body.phone
		}}, 
		{ new: true }, function (err, user) {
	  if (err) {
      res.status(404).json({error: "Error Processing request"})
	  }else {
      res.status(200).json({ "message": "User successfully updated" })
    }
	})
});


  const updateUser = (req, res, next) => {
    var userId = req.params._id;
    User.findByIdAndUpdate(userId, 
      { $set: {
        userName: req.body.userName,
      }}, 
      { new: true }, function (err, user) {
       if (err){
        next(ApiError.badClientRequest('There was an error with this action. Please try again'));
        return;
       } else {
        res.status(200).json({message: "Update operation successful"})
       }
    })
  }

////////////////////// END OF GUIDES FOR ROUTES   ////////////////////////




module.exports = router;  