const express = require('express');
const db = require("../../models");
const Router = express.Router();


/**
 * Routes to perform several deletion actions, 
 * and only meant for super-admins
 */

// Permanently delete all users
router.delete('/danger_delete_users', 
(req, res, next) => {
    db.User.delete({}, (err, res) => {
        if(err) {
            res.status(403).json({error: "Forbidden action"})
            return;
        } else {
            res.status(200).json({message: "Delete Successful"})
        }
    })
})

// Delete all archived users
route.delete('/delete_archived_us', (req, res, next) => {
    db.Archived_users.delete({}, (err, res) => {
        if(err) {
            res.status(403).json({error: "Forbidden action"})
            return;
        } else {
            res.status(200).json({message: "Delete Successful"})
        }
    })
});

