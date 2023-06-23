// auth = user à changer !!!

const router = require("express").Router();
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");

// authentification
router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

// refresh ??
// router.post('/refresh', userController.refresh)

// user display
router.get("/:id", userController.userInfo);

//router.put('/:id', userController.updateUser);

//router.delete('/:id', userController.deleteUser);

module.exports = router;
