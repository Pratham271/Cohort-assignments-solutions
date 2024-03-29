const jwt = require('jsonwebtoken');
const { User } = require('../db');
const zod = require('zod')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const validate = words[1]
    try {
        const verify = jwt.verify(validate, "secret")
        if(verify.username){
           next()
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

module.exports = userMiddleware;