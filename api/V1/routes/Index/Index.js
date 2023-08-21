const {childProcess} = require('child_process') 

const { TIMEOUT } = require('dns');

const express = require('express');

const router = express.Router();

const redisCl = require('../../../../vars/cache');

// const bcrypt = require('bcryptjs');

const db = require('../../models');

const { requireAuthentication } = require('../../middlewares/Authentication');


//ROUTES
router.get('/', (req, res, next) => {
    res.status(200).json(`fundX api root route`)
});


router.get('/testAuthentication', requireAuthentication, (req, res, next) => {
    res.json(`Congratulations, authenticated user ` + req.session.passport.user)
});


// Get all Notifications
router.get('/notifs/:filterparam', async (req, res, next) => {
    const queryParam = req.params.filterparam;
    const cachePayload = await redisCl.get(`${queryParam}notifications`)
    if(cachePayload){
        cachePayload = JSON.parse(cachePayload)
        res.status(200).json(cachePayload)
        return;
        }
    try{
        db.Notification.find({ notifconsumer: queryparam })
            .exec(( err, result ) => {
                if(err){   
                res.status(400).json('Error fetching notifications')
                return;
                } else {
                redisCl.set(`${queryParam}notifications`, JSON.stringify(result), 'EX', 1800)
                    res.status(200).json(data = {notifications: result})
                    return;
                }
            })
        }
    catch (error) {
        res.status(500).json({"error": "An error occured. Please try again"})
        return;
    }
})


router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

module.exports = router;  