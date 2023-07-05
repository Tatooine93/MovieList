const router = require("express").Router();
const listController = require("../controller/list.controller");

// create list
router.post("/create", listController.createList);

// get user's list
router.get("/user/:userId", listController.userList);

// list info
router.get("/:listId", listController.listInfo);

// update list
router.put("/:listId", listController.updateList);

// delete list
router.delete("/:listId", listController.deleteList);

module.exports = router;
