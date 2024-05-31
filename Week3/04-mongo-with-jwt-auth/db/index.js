const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:cTtpmFzMspA7ZhnM@cluster0.wiuyda9.mongodb.net/course_selling_app')
.then(()=> console.log("Connected to mongo"))
.catch((error)=> console.log("Failed to connect to mongo " +error.message));

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    coursesPurchased : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    courseBy : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }]

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}