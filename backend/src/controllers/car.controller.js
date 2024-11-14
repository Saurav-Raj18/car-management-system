const { Car } = require('../models/car.model');

// Create car route
const addCar = async (req, res) => {
    try {
        const { title, description, tags, images } = req.body;

        if (!images || images.length === 0) {
            return res.status(400).json({ message: 'At least one image URL is required.' });
        }

        if (images.length > 10) {
            return res.status(400).json({ message: 'You can upload up to 10 images only.' });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User authentication failed.' });
        }

        const newCar = new Car({
            title,
            description,
            tags: tags ? tags.split(',') : [],
            images,
            user: req.user._id,
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Could not save car.' });
    }
};

const getCar = async (req, res) => {
    try {
        const userId = req.user._id;  // Assume req.user is populated by authentication middleware

       // console.log(req)
        // Find all cars where the 'user' field matches the logged-in user
        const userCars = await Car.find({ user: userId });

        if (userCars.length === 0) {
            return res.status(404).json({ message: 'No cars found for this user.' });
        }
        
        res.status(200).json(userCars);
    } catch (err) {
        console.error('Error fetching user cars:', err);
        res.status(500).json({ message: 'Server error. Could not retrieve cars.' });
    }
}

// Update car route
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, images } = req.body;

        const car = await Car.findOne({ _id: id, user: req.user._id });
        if (!car) {
            return res.status(404).json({ message: 'Car not found or not authorized.' });
        }

        if (images && images.length > 10) {
            return res.status(400).json({ message: 'You can upload up to 10 images only.' });
        }

        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags ? tags.split(',') : car.tags;
        car.images = images || car.images;

        await car.save();
        res.status(200).json(car);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Could not update car.' });
    }
};

// Delete car route
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Car.findOneAndDelete({ _id: id, user: req.user._id });
        if (!car) {
            return res.status(404).json({ message: 'Car not found or not authorized.' });
        }

        res.status(200).json({ message: 'Car deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Could not delete car.' });
    }
};

module.exports = { addCar, updateCar, deleteCar, getCar };
