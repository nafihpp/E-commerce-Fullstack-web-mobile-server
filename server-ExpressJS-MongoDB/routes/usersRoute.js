const express = require("express");
const router = express.Router();
const { signUp, signIn, protected } = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes
router.post("/register", signUp);
router.post("/login", signIn);
router.get("/protected", authMiddleware, protected);
// router.route("/admin/users").get(isLoggedIn, customRole("admin"), adminAllUser);

module.exports = router;
