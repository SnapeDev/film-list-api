const Movie = require("./schemas/Movie");
const createError = require("http-errors");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.createMovie = async (req, res) => {
  // store request body in a variable
  // req body contains todo object
  try {
    const { title, director, watched } = req.body;

    const newMovie = await Movie.create({
      title,
      director,
      watched: Boolean(watched),
    });

    res.send(newMovie);
  } catch (error) {
    next(createError(400, error.message));
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return next(createError(404, "Movie not found."));
    }
    res.send(movie);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return next(createError(404, "Movie not found."));
    }
    res.send(movie);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return next(createError(404, "Movie not found."));
    }
    res.send(movie);
  } catch (error) {
    next(createError(500, error.message));
  }
};
