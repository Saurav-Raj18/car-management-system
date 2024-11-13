const express = require('express');
const { addCar, viewCars, searchCars, getCarById, updateCar, deleteCar } = require('../controllers/car.controller');
const upload = require('../utils/upload'); // Configure multer for file uploads

const Carouter = express.Router();
Carouter.post('/cars',addCar);

module.exports = Carouter;
