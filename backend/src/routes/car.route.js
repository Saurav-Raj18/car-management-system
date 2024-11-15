const express = require('express');
const { addCar, updateCar, deleteCar, getCar, getCarDetail } = require('../controllers/car.controller');
const {authenticate}  = require('../middleware/authenticate.middleware');
const multer = require('multer');
const path = require('path');



const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','/uploads'))
    },
    
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})


const Carouter = express.Router();
Carouter.route('/cars').post(authenticate ,upload.array('image',10),addCar)
// Carouter.route('/cars').post(authenticate, addCar);
Carouter.route('/cars').get(authenticate,getCar);
Carouter.route('/cars/:id').put(authenticate,updateCar)
Carouter.route('/cars/:id').delete(authenticate,deleteCar)
Carouter.route('/cars/:id').get(authenticate,getCarDetail)

module.exports = Carouter;
