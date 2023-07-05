const router = require("express").Router();
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");

// authentification

// create user
router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

// get user
router.get("/:id", userController.userInfo);

// update user
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
