const express = require("express");
const app = express();
const moviesRouter = require("./router");
const PORT = 3001;
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./schemas/User");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

dotenv.config();
connectDB();

// Middleware
app.use(express.json());

app.post("/movies/auth", async (req, res) => {
  console.log("arrived");
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.sendStatus(401);
  }
  if (req.body.password !== user.password) {
    return res.sendStatus(403);
  }
  user.token = uuidv4();
  await user.save();
  res.send({ token: user.token });
});

// Authorization middleware
app.use(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const user = await User.findOne({ token: authHeader });
  if (user) {
    next();
  } else {
    res.sendStatus(403);
  }
});

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
