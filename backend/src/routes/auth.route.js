const express = require('express');
const authRouter = express.Router();
const {registerUser}=require('../controllers/auth.controller.js');
const {loginUser}=require('../controllers/auth.controller.js')
authRouter.post("/signup",registerUser);
authRouter.post("/signin",loginUser);


module.exports=authRouter;