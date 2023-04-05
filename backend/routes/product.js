const productController = require("../controllers/productController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL PRODUCTS
router.get("/", verifyToken, productController.getAllProducts);

//ADD PRODUCT
router.post("/add", verifyTokenAndAdmin, productController.addProduct);

//DELETE PRODUCT
router.delete("/delete/:id", verifyTokenAndAdmin, productController.deleteProduct);

//UPDATE PRODUCT
router.put("/update/:id", verifyTokenAndAdmin, productController.updateProduct);

//GET PRODUCT BY SLUG
router.get("/:slug", verifyToken, productController.getProductBySlug);

module.exports = router;
