const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const zod = require("zod")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const router = Router();

// const schema = zod.object({
  
//     username: zod.string(),
//     password: zod.string().min(4),
// })

const UserSchema = zod.string();
const passwordSchema = zod.string().min(4)

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;
 
    try {
        const validUsername = UserSchema.safeParse(username)
        const validPassword = passwordSchema.safeParse(password)
        const admin = await Admin.findOne({
            username: validUsername.data
        })
        if(!admin){
            const hashedPassword = await argon2.hash(validPassword.data)
            await Admin.create({
                username: validUsername.data,
                password: hashedPassword
            })
            res.status(201).json({
                message: "User created successufully"
            })
        }
        else{
            res.status(404).json({
                message: "User already exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username,password} = req.body
    try {
        
        const admin = await Admin.findOne({
            username
        })
        if(!admin){
            res.status(404).json({
                message: "User does not exist"
            })
            
        }
        const verified = await argon2.verify(admin.password, password)
        if(verified){
            const token = jwt.sign({username}, "secret")
            res.status(200).json({
                token
            })
        }
        else{
            res.status(403).json({
                message: "Wrong credentials"
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const {title,description,price,imageLink} = req.body;
    const token = req.headers.authorization;
    const words = token.split(" ")
    const decoded = jwt.decode(words[1])
    try {
        const admin = await Admin.findOne({
            username: decoded.username
        })
        const admin_id = admin._id

        const course = await Course.create({
            title,
            description,
            price,
            imageLink,
            published: true,
            courseBy : admin_id
        })
        res.status(201).json({
            course
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({})
    let courseObject = []
    for(let i=0; i<courses.length; i++){
        const adminId = courses[i].courseBy[0]._id
        const admin = await Admin.findById(adminId)
        courseObject.push({
            title: courses[i].title,
            description: courses[i].description,
            price: courses[i].price,
            imageLink: courses[i].imageLink,
            published: courses[i].published,
            courseBy: admin.username
        })
    }
    
    res.status(200).json({
     courseObject
    })
});

module.exports = router;