const commentController = require("../controllers/commentController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();

//GET ALL COMMENTS
router.get("/", verifyToken, commentController.getAllComments);

//ADD COMMENT
router.post("/add", verifyToken, commentController.addComment);

//GET ALL COMMENTS BY PRODUCT ID
router.get("/:productId", verifyToken, commentController.getAllCommentsByProductId);

//DELETE COMMENT
router.delete("/delete/:id", verifyTokenAndAdmin, commentController.deleteComment);

module.exports = router;
