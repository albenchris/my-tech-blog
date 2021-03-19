const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// render posts on homepage "/"
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "contents",
            "created_at"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render("homepage", {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err));
});

// render login page "/login"
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// render single-post page "/post/:id"
router.get("/post/:id", withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "contents",
            "created_at"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render("single-post", {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;