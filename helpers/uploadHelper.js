const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}-${hours}${minutes}${seconds}`;

        // Remove spaces and numbers from the original filename
        const originalName = file.originalname.replace(/[\s0-9]/g, '');
        
        cb(null, `${formattedDate}-${originalName}`); // File name
    },
});

const uploadImage = multer({ storage: storage });

module.exports = uploadImage;
