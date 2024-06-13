const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})

const uploadImage = multer({storage, limits: { fileSize: 40 * 1024 * 1024 }})

module.exports = uploadImage;