const jwt=require('jsonwebtoken')
const errorhandler = require("../utils/errorhandler");
const catcherror = require("./catcherror");
const {User} = require('../models/user.models');


exports.authenticate=catcherror(async(req,res,next)=>{
    const token=req.cookies.access_token
    //console.log(req.cookies.access_toke)
    if(!token){
        return next(new errorhandler("login first",401))
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    req.user= await User.findById(decode.id)
    next()
})
