const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

// GET all posts "/api/posts"
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "contents",
            "created_at"
        ],
        order: [["created_at", "DESC"]],
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => res.status(500).json(err));
});

// GET single post "/api/posts/:id"
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {id: req.params.id},
        attributes: ["id", "title", "contents", "created_at"],
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
            res.json(dbPostData);
        })
        .catch(err => res.status(500).json(err));
});

// CREATE a post "/api/posts"
router.post("/", (req, res) => {
    // expects {
    //     title: "Post Title",
    //     contents: "blah blah blah",
    //     user_id: 1
    // }
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id || /* take this out when login function created */ req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => res.status(500).json(err));
});

// UPDATE a post "/api/posts/:id"

// DELETE a post "/api/posts/:id"

module.exports = router;