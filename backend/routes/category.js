const cateController = require("../controllers/cateController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL CATEGORIES
router.get("/", cateController.getAllCategories);

//ADD CATEGORY
router.post("/add", cateController.addCategory);

//DELETE CATEGORY
router.delete("/delete/:id", cateController.deleteCategory);

//UPDATE CATEGORY
router.put("/update/:id", cateController.updateCategory);

module.exports = router;
