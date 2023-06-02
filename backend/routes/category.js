const cateController = require("../controllers/cateController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL CATEGORIES
router.get("/", verifyToken, cateController.getAllCategories);

//ADD CATEGORY
router.post("/add", verifyTokenAndAdmin, cateController.addCategory);

//DELETE CATEGORY
router.delete("/delete/:id", verifyTokenAndAdmin, cateController.deleteCategory);

//UPDATE CATEGORY
router.put("/update/:id", verifyTokenAndAdmin, cateController.updateCategory);

module.exports = router;
