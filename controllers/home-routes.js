const router = require("express").Router();
const { Post, User, Profile, Comment } = require("../models");
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
    include: [
      {
        model: User,
        attributes: ["name", "id"],
        include: { model: Profile, attributes: ["avatar"] },
      },
      {
        model: Comment,
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("post", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET route for single post and comments
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "image", "imageId", "body", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_body", "post_id", "user_id", "dateCreated"],
        include: {
          model: User,
          attributes: ["name", "id"],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }

      const post = postData.get({ plain: true });

      res.render("singlepost", {
        post,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get route for profile with auth
router.get("/profile", withAuth, async (req, res) => {
  console.log("here");
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
    const profileData = await Profile.findOne(
      { where: { user_id: req.params.id } },
      {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      }
    );

    const profile = profileData.get({ plain: true });

    console.log("profile:", profile);

    res.render("viewProfile", {
      profile,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
