const router = require('express').Router();
const { Content, User } = require('../models');
const withAuth = require('../utils/auth');

// get route for homepage 
router.get('/', async (req, res) => {
    try {
        // get all posts for user data 
        const contentData = await Content.findall({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // serialize data
        const contents = contentData.map((content) => content.get({ plain: true }));

        // pass serialized data and session flag into homepage template
        res.render('homepage', {
            contents,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get route for posts in content 
router.get('/content/:id', async (req, res) => {
    try {
        const contentData = await Content.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const contents = contentData.get({ plain: true });

        res.render('content', {
            ...contents,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get route for profile with auth 
router.get('/profile', withAuth, async (req, res) => {
    try {
        // find logged user based on session id 
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Content }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get route for login
router.get('/login', (req, res) => {
    // if user is logged in, redirect to another route 
    if (req.session.logged_in) {
        res.redirect('./profile');
        return;
    }

    res.render('login');
});

module.exports = router;