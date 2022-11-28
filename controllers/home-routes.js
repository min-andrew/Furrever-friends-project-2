const router = require("express").Router();
const { Post, User, Profile } = require("../models");
const withAuth = require("../utils/auth");
const path = require('path');

// This file contains routes for pages that will render

// get route for login page (homepage). If already logged in, redirects to /post page.
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/post");
    return;
  }
  res.render('login');
});

//GET route for posts on the Post page (Lickin' Post)
router.get("/post", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("post", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get route for profile with auth. This is for the user's profile page. 
// TODO: Is the model right? We don't call the profile model here. 
router.get("/profile", withAuth, async (req, res) => {
  try {
    // find logged user based on session id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create an account on the Create Account page. If already logged in, redirects to Post (lickin' post) //TODO: Is that where we'd like it redirected? 
router.get("/createac", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/post')
    return;
  }
  res.render("createac")
})

module.exports = router;
