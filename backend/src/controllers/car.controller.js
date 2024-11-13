const { Car } = require('../models/car.model');
const { asyncHandler } = require('../utils/asyncHandler.js');
const { ApiError } = require('../utils/apiError.js');
const { apiResponse } = require('../utils/apiResponse.js');
const { upload } = require('../utils/upload'); // Import the upload middleware

// Add Car
const addCar = asyncHandler(async (req, res) => {
    // Use multer's upload middleware to handle file uploads
   // console.log(upload)
    upload.array('images', 10)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Error in file upload', error: err.message });
        }

        // Log the request body and uploaded files
        console.log(req.body); // Includes title, description, tags
       // console.log(req.files); // Includes uploaded files

        // Extract the car details and images
        const { title, description, tags } = req.body;
        const images = req.files.map(file => file.path); // Extract file paths from uploaded files

        if (!images || images.length === 0) {
            return res.status(400).send('No images uploaded');
        }

        // Create the new car object and save it in the database
        const car = await Car.create({
            title,
            description,
            tags,
            images,
            user: req.user._id, // Assuming req.user contains the authenticated user's ID
        });

        // Respond with success and the car details
        res.status(201).json({
            success: true,
            data: car,
            message: 'Car added successfully'
        });
    });
});

// View All Cars
const viewCars = asyncHandler(async (req, res) => {
    const cars = await Car.find({ user: req.user._id });
    res.status(200).json({ success: true, data: cars });
});

// Search Cars
const searchCars = asyncHandler(async (req, res) => {
    const { keyword } = req.query;
    const cars = await Car.find({
        user: req.user._id,
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { tags: { $regex: keyword, $options: 'i' } }
        ]
    });
    res.status(200).json({ success: true, data: cars });
});

// Get Car by ID
const getCarById = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user._id.toString()) throw new ApiError(404, 'Car not found');
    res.status(200).json({ success: true, data: car });
});

// Update Car
const updateCar = asyncHandler(async (req, res) => {
    // Use multer's upload middleware for handling file uploads
    upload.array('images', 10)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Error in file upload', error: err.message });
        }

        const { title, description, tags } = req.body;
        const images = req.files?.map(file => file.path);

        const updateData = { title, description, tags, ...(images && { images }) };
        const car = await Car.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            updateData,
            { new: true }
        );

        if (!car) throw new ApiError(404, 'Car not found');
        res.status(200).json({ success: true, data: car, message: 'Car updated successfully' });
    });
});

// Delete Car
const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!car) throw new ApiError(404, 'Car not found');
    res.status(200).json({ success: true, message: 'Car deleted successfully' });
});

module.exports = { addCar, viewCars, searchCars, getCarById, updateCar, deleteCar };
