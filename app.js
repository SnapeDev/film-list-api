const express = require("express");
const app = express();
const moviesRouter = require("./router");
const PORT = 3000;

// Middleware
app.use(express.json());

// Use the movies router
app.use("/movies", moviesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Start the server with a get request
// is the endpoint
// req is the request
// res is the response
// res.send sends a response to the client
// request will contain the request body, headers, etc.
// response is used to send back information to the client (person who made the request)
