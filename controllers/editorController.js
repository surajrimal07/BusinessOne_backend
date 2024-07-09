const uploadImage = async (req, res) => {
    const editorImage = req.file;
    const userId = req.user;
    try {
      const uploadedImage = editorImage.filename;
      const uploadedImageUrl = `${process.env.BACKEND_URL}/uploads/${uploadedImage}`;
      res.status(200).json({
        success: true,
        message: "Editor image uploaded successfully",
        link: uploadedImageUrl,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  
  const uploadVideo = async (req, res) => {
    const editorVideo = req.file;
    const userId = req.user;
    try {
      const uploadedVideoName = editorVideo.filename;
      const uploadedVideoUrl = `${process.env.BACKEND_URL}/uploads/${uploadedVideoName}`;
      res.status(200).json({
        success: true,
        message: "Editor video uploaded successfully",
        link: uploadedVideoUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  
  const uploadFile = async (req, res) => {
    const editorFile = req.file;
    const userId = req.user;
    try {
      const uploadedFileName = editorFile.filename;
      const uploadedFileUrl = `${process.env.BACKEND_URL}/uploads/${uploadedFileName}`;
      res.status(200).json({
        success: true,
        message: "Editor file uploaded successfully",
        link: uploadedFileUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  
  module.exports = {
    uploadImage,
    uploadVideo,
    uploadFile,
  };