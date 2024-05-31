const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const zod = require('zod');
const { Admin, Course } = require("../db");

const router = Router();


const Schema = zod.string().min(1);

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const {username,password} = req.body;
    const validUsername = Schema.safeParse(username)
    const validPassword = Schema.safeParse(password)
    if(validUsername && validPassword && validUsername.data === "admin" && validPassword.data === "admin"){
        await Admin.create({
            username: username,
            password: password
        })
    
        res.status(201).json({
            message: 'Admin created successfully'
        })
    }
    else{
        res.status.json({
            msg: "Invalid username or password"
        })
    }

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    try {
        const { title,description,price,imageLink} = req.body;
        const newCourse = await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink: imageLink,
        published: true
    })
    const courseId = newCourse._id;
    res.status(201).json({
        msg:"Course created successfully",
        courseId: courseId
    })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Something went wrong")
    }

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    const courses = Course.find({})
    res.status(200).json({
        courses
    })
});

module.exports = router;