const commentController = require("../controllers/commentController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();

//ADD COMMENT
router.post("/add", verifyToken, commentController.addComment);

//GET ALL COMMENTS
router.get("/:productId", verifyToken, commentController.getAllComments);

//DELETE COMMENT
router.delete("/delete/:id", verifyTokenAndAdmin, commentController.deleteComment);

module.exports = router;
