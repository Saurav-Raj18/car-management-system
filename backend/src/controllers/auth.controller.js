const { asyncHandler } = require('../utils/asyncHandler.js')
const { ApiError } = require('../utils/apiError.js')
const { User } = require('../models/user.models.js')
const { apiResponse } = require('../utils/apiResponse.js')

var bcrypt = require('bcryptjs');//imported bcrypt library for password encyption
var jwt = require('jsonwebtoken');//jwt is bearer token for authentication
const sendtoken = require('../utils/jwt.js');


const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    //console.log(username,email,password)
    if (!username || !email || !password) {
        next(ApiError(400, "All fields are required"))
    }

    //searching in the database if user is already there or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]

    })
    //checking if the user is already registered
    if (existedUser) {
        next(ApiError(409, "User with email or password already exist"))
    }
    //  const newUser=new User({
    //       username,
    //       email,
    //       password
    //  })
    //  await newUser.save();


    //making password encrypted:
    const hashPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({
        username: username,
        email: email,
        password: hashPassword
    })

    if (!newUser) {
        next(ApiError(500, "Something went wrong while creating user"))
    }

    return res.status(201).json(
        new apiResponse(200, newUser, "user registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 3 * 60 * 60 * 1000);
    if (!email || !password) {
        next(ApiError(400, "All fields are required"))
    }
    try {
        const validUser = await User.findOne({ email })
        //console.log(validUser.email)
        if (!validUser) {
            // res.status(404).json("User not found!!!")
            // next(ApiError(404, "User not found!!!"))
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const validpassword = bcrypt.compareSync(password, validUser.password)
       // console.log(validpassword)
        if (!validpassword) {
            //console.log(validpassword)
            res.status(400).json({
                success: false,
                message: "Invalid password",
            })
            //console.log("password mismatch!!!")
            //return next(ApiError(400, "invalid password"))
        }
        else {
            const user= await User.findOne({email}).select('+password')
           // console.log(user)
            if(!user){
                return next(new errorhandler('invalid email&password',401))
        
            }
            sendtoken(user,200,res)

        }
    }
    catch (error) {
        console.log("Error in searching userdata", error)
        next(error);
    }
})

module.exports = { registerUser, loginUser};
