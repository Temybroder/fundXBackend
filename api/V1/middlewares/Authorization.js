/**
 * 
 * @param Route Authorization Permission Functions for different role types
 * 
 */

 const ApiError = require("./errorManager/apiErrors")

// User Types Declaration
const user = ['Superadmin', 'admin', 'user'];
const funder = ['Superadmin', 'admin', 'funder'];
const admin = ['Superadmin', 'admin'];
const superAdmin = 'Superadmin';

// Grant Route Access for Single User Type 
const authUser = () => {
    return (req, res, next) => {
        const userRole = req.session.passport.user.role;
        if(user.includes(userRole)){
            next();
        } else {
           next(ApiError.unauthorized('Unauthorized: You lack sufficient priviledges to access this Resource'));
           return;
        }
    }
}

// Grant Route Access for Single Funder Type 
const authFunder = () => {
    return (req, res, next) => {
        const userRole = req.session.passport.user.role;
        if(funder.includes(userRole)){
            next();
        } else {
            next(ApiError.unauthorized('Unauthorized: You lack sufficient priviledges to access this Resource'));
            return;
         }
    }
}

// Grant Route Access for Admin User Type 
const authAdmin = () => {
    return (req, res, next) => {
        const userRole = req.session.passport.user.role;
        if(admin.includes(userRole)){
            next();
        } else {
            next(ApiError.unauthorized('Unauthorized: You lack sufficient priviledges to access this Resource'));
            return;
         }
    }
}

// Grant Route Access for Super Admin User Type 
const authSuperadmin = () => {
    return (req, res, next) => {
        const userRole = req.session.passport.user.role;
        if(superAdmin == userRole){
            next();
        } else {
            next(ApiError.unauthorized('Unauthorized: You lack sufficient priviledges to access this Resource'));
            return;
         }
    }
}
const authFunctions = {authUser, authFunder, authAdmin, authSuperadmin}

module.exports = authFunctions;