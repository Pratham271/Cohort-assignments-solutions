// Middleware for handling auth
const jwt = require('jsonwebtoken');
const { Admin } = require('../db');
const zod = require('zod')

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization

    const words = token.split(" ");
    const validate = words[1];
    // console.log(validate)
    try {
        const verify = jwt.verify(validate,"secret");
        if(verify.username){
            next();
        }
        else{
            res.status(403).json({
                message: "Not an authenticated user"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    

}

module.exports = adminMiddleware;