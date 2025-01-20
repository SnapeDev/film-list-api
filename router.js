const express = require("express");
const router = express.Router();
const moviesController = require("./moviesController");

router.get("/", moviesController.getAllMovies);
router.post("/", moviesController.createMovie);
router.get("/:id", moviesController.getMovieById);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;

//get is used for retreiving data
//post is used for creating data
//put is used for updating data
//delete is used for deleting data
