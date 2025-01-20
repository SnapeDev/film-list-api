let movies = [];
let nextId = 0;

exports.getAllMovies = (req, res) => {
  res.json(movies);
};

exports.createMovie = (req, res) => {
  // store request body in a variable
  // req body contains todo object
  const { title, director, watched } = req.body;

  if (!title || !director) {
    return res
      .status(400)
      .json({ message: "Title and director are required." });
  }

  const newMovie = {
    id: nextId++,
    title,
    director,
    watched: watched || false,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
};

exports.getMovieById = (req, res) => {
  const { id } = req.params;
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return res.status(404).json({ message: "Movie not found." });
  }

  res.json(movie);
};

exports.updateMovie = (req, res) => {
  const { id } = req.params;
  const { title, director, watched } = req.body;
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return res.status(404).json({ message: "Movie not found." });
  }

  if (title) movie.title = title;
  if (director) movie.director = director;
  if (watched !== undefined) movie.watched = watched;

  res.json(movie);
};

exports.deleteMovie = (req, res) => {
  const { id } = req.params;
  // make it so the array filters out the object
  // that has the id which matches the one in our params
  const movieIndex = movies.findIndex((m) => m.id === parseInt(id));

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found." });
  }

  movies.splice(movieIndex, 1);
  res.status(204).send();
};
