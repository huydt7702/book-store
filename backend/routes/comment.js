const commentController = require("../controllers/commentController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();

//ADD COMMENT
router.post("/add", commentController.addComment);

//GET ALL COMMENTS
router.get("/:productId", commentController.getAllComments);

//DELETE COMMENT
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
