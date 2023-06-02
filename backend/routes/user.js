const userController = require("../controllers/userController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

//DELETE USER
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
