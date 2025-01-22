const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  director: {
    type: String,
    required: [true, "Director is required."],
  },
  watched: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", movieSchema);
