const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      trim: true,
    },

    listId: {
      type: String,
      required: true,
    },

    apiMovieId: {
      type: Number,
    },

    /*         parameters: {
            need to be defined
        }, */

    downloaded: {
      type: Boolean,
    },

    seen: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
