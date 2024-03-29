const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require('zod')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2');

const { User, Course, Admin } = require("../db");

const usernameSchema = zod.string();
const passwordSchema = zod.string().min(4);

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        const validUsername = usernameSchema.safeParse(username);
        const validPassword = passwordSchema.safeParse(password);
        const user = await User.findOne({
            username: validUsername.data
        })
        if(!user){
            const hash = await argon2.hash(validPassword.data)
            await User.create({
                username: validUsername.data,
                password: hash
            })
            res.status(201).json({
                msg: "User created successfully"
            })
        }
        else{
            res.status(403).json({
                message: "User already exists"
            })
        }

    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({username})
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        const verifyPass = argon2.verify(user.password,password)
        if(!verifyPass){
            res.status(403).json({
                message: "Wrong credentials"
            })
        }
        const token = jwt.sign({username}, "secret")
        res.status(200).json({
            token
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
});

router.get('/courses', userMiddleware ,async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})
    let courseObject = []
    for(let i=0; i<courses.length; i++){
        const courseId = courses[i].courseBy[0]._id;
        const admin = await Admin.findById(courseId)
        courseObject.push({
            title: courses[i].title,
            description: courses[i].description,
            price: courses[i].price,
            published: courses[i].published,
            courseBy: admin.username
        })
    }
    res.status(200).json({
        courseObject
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.headers.authorization
    const words = token.split(" ")
    const decode = jwt.decode(words[1])
    await User.updateOne({
        username: decode.username}, {
            "$push" : {
                coursesPurchased: courseId
            }
        })
    res.status(200).json({
        message: "Course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
   const token = req.headers.authorization;
   const words = token.split(" ")
   const decode = jwt.decode(words[1])
   const user = await User.findOne({username: decode.username})
   
   const courses = await Course.find({
    _id: {
        "$in": user.coursesPurchased
    }
   })
   res.status(200).json({
    courses: courses
   })

});

module.exports = router