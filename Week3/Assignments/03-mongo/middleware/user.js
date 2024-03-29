const { User } = require("../db");


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username,password} = req.body;
    const user = User.findOne({
        username:username,
        password:password
    })
    if(!user){
        res.status(403).send("User does not exist")
    }
    else{
        next();
    }
}

module.exports = userMiddleware;