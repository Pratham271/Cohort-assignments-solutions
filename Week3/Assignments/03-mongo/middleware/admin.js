// Middleware for handling auth
const  { Admin } =  require("../db");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username,password} = req.headers;
    const admin = Admin.findOne({
        username:username,
        password:password
    })
    if(!admin){
        res.status(403).send("Admin does not exist")
    }
    else{
        next();
    }

}

module.exports = adminMiddleware;