const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.post("/register", function (req, res) {
    authController.registerUser(req, res);
});

//REFRESH TOKEN
router.post("/refresh", function (req, res) {
    authController.requestRefreshToken(req, res);
});
//LOG IN
router.post("/login", function (req, res) {
    authController.loginUser(req, res);
});
//LOG OUT
router.post("/logout", function (req, res) {
    authController.userLogout(req, res);
});

module.exports = router;
