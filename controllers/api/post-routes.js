const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
var multer = require('multer');
require('dotenv').config();

var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter })

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routes to create new posts
router.post('/', withAuth, upload.single('image'), async (req, res) => {
  try {
    await cloudinary.uploader.upload(req.file.path, function (result) {
      console.log(result)
      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;

      const newPost = Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newPost);
    });
     } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;