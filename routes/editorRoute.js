const router = require('express').Router()
const editorController = require('../controllers/editorController')
const upload = require("../helpers/uploadHelper.js");

router.post('/uploadImage', upload.single('editorImage'), editorController.uploadImage)
router.post('/uploadVideo', upload.single('editorVideo'), editorController.uploadVideo)
router.post('/uploadFile', upload.single('editorFile'), editorController.uploadFile)

module.exports = router