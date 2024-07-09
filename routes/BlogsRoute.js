const router = require("express").Router();
const uploadImage = require("../helpers/uploadHelper.js");

const BlogsController = require("../controllers/BlogsController");
const { authGuardAdmin } = require("../middleware/authGuard");

router.post("/create_blogs",authGuardAdmin, uploadImage.single("image"), BlogsController.CreateBlogs);
router.get("/get_all_blogs", BlogsController.getContent);
router.get(`/get_blog_id/:id`, BlogsController.getContentById);
router.get("/get_recent_blogs", BlogsController.getRecentlyAddedBlogs);
router.put('/admin_update_blog/:id',authGuardAdmin, uploadImage.single('image'),BlogsController.updateBlog);
router.put('/admin_delete_blog/:id',authGuardAdmin,BlogsController.deleteBlog);

module.exports = router;
