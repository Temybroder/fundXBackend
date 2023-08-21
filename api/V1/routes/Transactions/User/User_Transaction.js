const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//ROUTES
// Routes to Handle Everything Withdrawal
    // Route to find indivdual/agent who can fulfill withdrawal order
// Route to Handle Everything Deposit
    // Route to find indivdual/agent who can fulfill Dposit order
// Route to Handle 

/**
 * WIthdrawal and Deposit Consist of:
 * 1. Search for Agent that matches search criteria, and is open to fulfill order
 * 2. Once agents close to User's location are found, Send Request to Agents. 
 * 3. If one agent accepts, send agent info to User, and send User info to agent. Then, open transaction up 
 * // for processing once fulfilling is initiated by User and Agent.
 * 4. Listen for fulfilling to be initiated in the App by User and Agent, initiate transaction object in a new route, perform debits and credits and allow Users
 *  // to perform physical exchange.
 * 5. Accept User and Agent ratings, reports and Confirm Close Transaction
 */

// Route {query} to find Agent{ag} who is open to fulfilling Withdrawal Orders, to fulfill Withdrawal order {ordw}
// We first search for individual. If individual is not found, we'll search for closest agent
router.post('/t1/query/ordw/ag', (req, res, next) => {

});

// Route {query} to find Agent{ag} who is open to fulfilling Deposit Orders, to fulfill Deposit order {orddp}
// We first search for individual. If individual is not found, we'll search for closest agent
router.post('/t1/query/orddp/ag', (req, res, next) => {

});

// SCRAP THIS ROUTE: PAYMENT PROCESSING IS HANDLED IN-APP
// INITTIALIZE DEBIT ON USER ACCOUNT (INITIALIZE PAYMENT)
router.post('/inp', (req, res, next) => {
    const form  = _.pick(req.body, ['amount', 'email', '']);
    form.metadata = {};
    form.amount *=100;
    initializePayment(form, (error, body) => {
        if(error){
            //handle errors
            return res.status(400).json({message: "Error processing payment"})
        }
        res.redirect(response.data.authorization_url);
        // After payment (debit on user) is successful, hits callback url
        })
});


// Save Payment Transaction data for every payment completed
router.post('/sptd', (req, res, next) => {

});

// Admin Route
// Fetch all transactions completed
router.get('/', (req, res, next) => {

});


// Admin Route
// Fetch transactions that match certain search criteria
router.get('/', (req, res, next) => {

});

// 
router.get('/', (req, res, next) => {

});

module.exports = router;