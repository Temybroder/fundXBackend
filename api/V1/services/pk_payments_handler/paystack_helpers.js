const express = require('express');
const router = express.Router();
const request = require('request');
const _ = require('lodash');
const path = require('path');
const {verifyAccount, createRecipient, initializePayout, verifybvn} = require('./paystack')(request); 

// ONLY FOR ADMIN AND CUSTOMER SUPPORT USE: IF USER COMPLAINS THEY ARE UNABLE TO VERIFY ACCOUNT IN-APP
// ROUTE TO VERIFY USER BANK ACCOUNT DETAILS
    router.get('/vpac', (req, res) => {
        const account_number = req.body.account_number;
        const bank_code = req.body.bank_code;
        const userId = req.user._id;
        // VERIFY ACCOUNT DETAILS FOR PAYOUT
        verifyAccount(account_number, bank_code, (error, body) => {
          const acnum = account_number;
          const bcode = bank_code;
          const msg = "There was a probilem with Your Account details";
            if(error){
                //handle errors appropriately
                return res.status(400).json({message: msg});
            } else {
          response = JSON.parse(body);        
          const data = _.at(response.data, ['account_number', 'account_name']);
            if (response.status == true){
            return res.status(200)
            .json({message: "True: Verified"});
          }
           else
                {
                  return res.status(400).json({message: msg});
                }}
         })
      });