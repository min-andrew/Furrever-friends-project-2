const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const profileRoutes = require('./profile-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/profile', profileRoutes);
router.use('/comment', commentRoutes)

module.exports = router;