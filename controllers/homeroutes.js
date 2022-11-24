const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// get route for homepage 
router.get('/', async (req, res) => {
    try {
        // get all posts for user data 
        const postData = await Post.findall({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // serialize data
        const posts = postData.map((post) => post.get({ plain: true }));

        // pass serialized data and session flag into homepage template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get route for posts in post 
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.get({ plain: true });

        res.render('post', {
            ...posts,
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
            include: [{ model: Post }],
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

//authentication for create new account
router.post('/createac', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        if (userData.find(user => user.email === email)) {

            res.render('createac', {
                message: 'User already registered.',
                messageClass: 'alert-danger'
            });

            return;
        }

        const hashedPassword = getHashedPassword(password);

        userData.push({
            name,
            email,
            password: hashedPassword
        });

        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
    } else {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
});

module.exports = router;