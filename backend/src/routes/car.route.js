const express = require('express');
const { addCar, updateCar, deleteCar, getCar } = require('../controllers/car.controller');
const upload = require('../utils/upload'); // Configure multer for file uploads
const {authenticate,authorize}  = require('../middleware/authenticate.middleware');

const Carouter = express.Router();
Carouter.route('/cars').post(authenticate, addCar);
Carouter.route('/cars').get(authenticate,getCar);
Carouter.route('/cars/:id').put(authenticate,updateCar)
Carouter.route('/cars/:id').delete(authenticate,deleteCar)

module.exports = Carouter;
