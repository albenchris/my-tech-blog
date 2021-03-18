const router = require("express").Router();
const { Comment, User } = require("../../models");

// GET all comments "/api/comments"
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: [
            "id",
            "comment_text",
            "user_id",
            "post_id"
        ],
        order: [["created_at", "DESC"]],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => res.status(500).json(err));
});

// CREATE a comment "/api/comments"

// DELETE a comment "/api/comments/:id"

module.exports = router;