const News = require("../model/news_model");

const CreateBlogs = async (req, res) => {
  const imageUrl = req.file;
  const { title, description, tags, shortDescription } = req.body;

  console.log(req.body);
  console.log(req.file);

  // Check if content is provided
  if (!title || !description || !shortDescription || !tags) {
    return res.json({
      success: false,
      message: "Please provide content",
    });
  }

  try {
    if (!imageUrl) {
      return res.json({
        success: false,
        message: "Please upload an image",
      });
    }

    const imageSaveUrl = `${process.env.BACKEND_URL}/uploads/${imageUrl.filename}`;

    // Create new content
    const newContent = new News({
      title,
      description,
      tags,
      shortDescription,
      image: imageSaveUrl,
    });
    await newContent.save();

    res.json({
      success: true,
      message: "Content created successfully",
      content: newContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getContent = async (req, res) => {
  try {
    const contents = await News.find({ isDeleted: { $ne: true } });
    res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getContentById = async (req, res) => {
//   const { id } = req.params; // Extract the blog ID from the request parameters
//   console.log( req.params)

//   try {
//     const content = await News.findById(id);
//     res.status(200).json(content);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getContentById = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await News.findById(id);
    const readingTime = calculateReadingTime(content.description);
    res.status(200).json({ ...content.toObject(), readingTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRecentlyAddedBlogs = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  try {
    const recentBlogs = await News.find({ _id: { $ne: id } , isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json(recentBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const calculateReadingTime = (content) => {
  const averageReadingSpeed = 300; // average reading speed in words per minute
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / averageReadingSpeed);
  return readingTime;
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, shortDescription } = req.body;
  const imageUrl = req.file;

  console.log(req.body);
  console.log(req.file);

  // Check if required fields are provided
  if (!title || !description || !shortDescription || !tags) {
    return res.json({
      success: false,
      message: "Please provide content",
    });
  }

  try {
    // Find existing content by ID
    const existingContent = await News.findById(id);
    if (!existingContent) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    // Update fields
    existingContent.title = title;
    existingContent.description = description;
    existingContent.tags = tags;
    existingContent.shortDescription = shortDescription;

    // Update image if provided
    if (imageUrl) {
      existingContent.image = `${process.env.BACKEND_URL}/uploads/${imageUrl.filename}`;
    }

    await existingContent.save();

    res.json({
      success: true,
      message: "Content updated successfully",
      content: existingContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const deleteBlog = async (req, res) => {
  console.log(req.body)
  const { id } = req.params;

  try {
    const content = await News.findById(id);

    if (!content) {
      return res.status(404).json({ message: "Blog not found" });
    }

    content.isDeleted = true;
    const updatedContent = await content.save(); 

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  CreateBlogs,
  getContent,
  getContentById,
  getRecentlyAddedBlogs,
  updateBlog,
  deleteBlog,
};
