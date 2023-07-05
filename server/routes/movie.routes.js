const router = require("express").Router();
const movieController = require("../controller/movie.controller");

// create list
router.post("/create", movieController.createMovie);

// get user's movie
//router.get("/user/:userId", movieController.userMovie);

// get list's movies
router.get("/list/:listId", movieController.listMovie);

// movie info
router.get("/:movieId", movieController.movieInfo);

// update list
router.put("/:movieId", movieController.updateMovie);

// delete list
router.delete("/:movieId", movieController.deleteMovie);

module.exports = router;
