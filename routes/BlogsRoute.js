const router = require("express").Router();
const uploadImage = require("../helpers/uploadHelper.js");

const BlogsController = require("../controllers/BlogsController");

router.post("/create_blogs", uploadImage.single("image"), BlogsController.CreateBlogs);
router.get("/get_all_blogs", BlogsController.getContent);
router.get(`/get_blog_id/:id`, BlogsController.getContentById);
router.get("/get_recent_blogs", BlogsController.getRecentlyAddedBlogs);

module.exports = router;
