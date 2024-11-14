const express = require('express');
const { addCar, updateCar, deleteCar, getCar, getCarDetail } = require('../controllers/car.controller.js');
const upload = require('../utils/upload'); // Configure multer for file uploads
const {authenticate,authorize}  = require('../middleware/authenticate.middleware');

const Carouter = express.Router();
Carouter.route('/cars').post(authenticate, addCar);
Carouter.route('/cars').get(authenticate,getCar);
Carouter.route('/cars/:id').put(authenticate,updateCar)
Carouter.route('/cars/:id').delete(authenticate,deleteCar)
Carouter.route('/cars/:id').get(authenticate,getCarDetail)

module.exports = Carouter;


