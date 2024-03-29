const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        const existingUser = await User.findOne({username:username})
        if(!existingUser){
            User.create({
                username: username,
                password: password
            })
            res.status(201).json({
                message: "User created successfully"
            })
        }
        else{
            res.json({
                message: "User already exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
    
});

router.get('/courses', userMiddleware,async(req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({})
        res.status(200).json({
        courses
    })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    let courseId = req.params.courseId;
    console.log(courseId)
    await User.updateOne({
        username: req.body.username}, {
            "$push": {
                purchasedCourses: courseId
            }
        })
    res.status(201).json({
        message: 'Course purchased successfully'
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })
    
    const courses = await Course.find({
        _id:  {
        "$in": user.purchasedCourses
    }
})
res.status(200).json({
    courses: courses
})
});

module.exports = router