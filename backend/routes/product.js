const productController = require("../controllers/productController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

//ADD PRODUCT
router.post("/add", productController.addProduct);

//DELETE PRODUCT
router.delete("/delete/:id", productController.deleteProduct);

//UPDATE PRODUCT
router.put("/update/:id", productController.updateProduct);

module.exports = router;
