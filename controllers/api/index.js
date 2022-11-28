const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const profileRoutes = require('./profile-routes')

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/profile', profileRoutes);

module.exports = router;