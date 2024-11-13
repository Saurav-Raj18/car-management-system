const multer = require('multer');
const path = require('path');

// Set storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the original file extension
    },
});

// Multer instance with storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };
