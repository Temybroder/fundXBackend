const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose")
const db = require('../models');

const userReg = async (req, res) => {
  // Required Payload
  // Name, Email, Password, Phone, Address, "User-role", Country-Code, Currency, Device-Type, Device-ID, Device-name

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userEmail = req.body.email;
  const phone = req.body.phone.toString();
  const gender = req.body.gender;
  const password = req.body.password;
  const password2 = req.body.password2;
  //const { Country_Code, Currency, Device_type} = req.body;
    let errors = [];
    if (!lastName || !firstName || !userEmail || !gender || !phone ||  !password || !password2
      ) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (!Country_Code || !Currency || !Device_type || Device_name ) {
      errors.push({ msg: 'Error Extracting User Device Data' });
    }
  
     if (password != password2) {
       errors.push({ msg: 'Passwords do not match' });
     }
  
    if (password.length < 8) {
      errors.push({ msg: 'Password must be at least 8 characters' });
    }
  
    if (errors.length > 0) {
     // Return a data error StatusCode
     return res.status(400).json({
        errors
      });
    } 
    else {
    db.User.findOne({ userEmail: email }).then(foundUser => {
          if ( foundUser ) {
            return res.status(200).json({message: 'Email already exists'});
          } 
          else {
          // const refToken = JWT.sign({ id: newUser._id }, JWTSecret);
          var newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              name: `${firstName} ${lastName}`,
              email : userEmail,
              phone: phone,
              gender: gender,
              password : password
            });
           bcrypt.genSalt(15, (err, salt) => {
            if (err){ 
              throw err
           } else { 
             bcrypt.hash(req.body.password, salt, (err, hash) => {
               if (err){ 
                 throw err
              };
                newUser.password = hash;
                newUser
                .save()
                .then(user => {
                if(err){
                   res.status(400)
                  .json({message: "There seems to have been an error signing you up. Please try again"})
                  return;
                        } else {
                         res.status(200)
                        .json({message: 'Succesful: FundX Account Created'});
                        return;
                        }
                      })
                      .catch((error) => {
                         res.status(400).json('Account not registered. Please try again. Error is ' + error);
                         return;
                       })
                    });
                   }
                 });  
               }
            })
          }
        }

	
	const funderReg = (req, res) => {
		 const { name, email, Phone, password, password2} = req.body;
		 const { Country_Code, Currency, Device_type} = req.body;
		  let errors = [];
    
      if (!name || !email || !Phone || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }

      if (!Country_Code || !Currency || !Device_type || Device_name ) {
        errors.push({ msg: 'Error Extracting User Device Data' });
      }
    
      if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
      if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
      }
	  
	  
	  
	}

    module.exports = {userReg, funderReg};