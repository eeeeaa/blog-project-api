const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

//Post
router.get("/", post_controller.posts_get);
router.post("/", post_controller.posts_post);

router.put("/:postId", post_controller.posts_put);
router.delete("/:postId", post_controller.posts_delete);

//Comment
router.get("/:postId/comments", comment_controller.comments_get);
router.post("/:postId/comments", comment_controller.comments_post);

router.put("/:postId/comments/:commentId", comment_controller.comments_put);
router.delete(
  "/:postId/comments/:commentId",
  comment_controller.comments_delete
);

module.exports = router;
