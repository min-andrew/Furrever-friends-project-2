const router = require("express").Router();
const { Post, User, Profile } = require("../models");
const withAuth = require("../utils/auth");
const path = require("path");

// get route for login page
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/post");
    return;
  }
  res.render("login");
});

//GET route for posts
router.get("/post", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("post", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get route for profile with auth
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

router.get("/createac", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("createac");
});

router.get("/profile/:id", async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    //const profile = profileData.get({ plain: true })
    const profile = profileData;
   
    res.render("viewProfile", {
      profile,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
