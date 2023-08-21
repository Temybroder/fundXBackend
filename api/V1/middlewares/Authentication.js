// const { connect } = require("../routes/Index/Index");

module.exports = {
    requireAuthentication: async (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    emptyAuthentication: (req, res, next) => {
      if (!req.isAuthenticated()){
        return next();
      }
      else {
        if(req.session.passport.user.role === 'user' || req.session.passport.user.role === 'funder'){ 
            return res.status(200).json('Successfully Authenticated')
            }
        }},
        
    requiretokenauth : async (req, res, next) => {
      const tokenPayload = req.headers['x-access-token'];
      if(!tokenPayload){
        return res.status(403).json('Unauthorized: Please login to gain access')
      } else {
        req.headers.cookie = `connect.sid=s%3A${tokenPayload}`
        try {
          if (
              req.session.passport.user !== undefined
              ) {
              return next();
              }
            else {
            return res.status(403).json('Unauthorized: Forged authorization attempt')
          }} catch (error) {
            return res.status(403).json('Forbidden: No required access credentials')
          }
      }
    },
    emptytokenauth : async(req, res, next) => {

    }
    };

