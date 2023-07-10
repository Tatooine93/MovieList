const MovieModel = require("../models/movie.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.createMovie = async (req, res) => {
  if (!ObjectID.isValid(req.body.listId)) {
    return res.status(400).send("listID unknown: " + req.body.listId);
  }

  const { movieName, listId, apiMovieId } = req.body;

  try {
    const movie = await MovieModel.create({ movieName, listId, apiMovieId });
    res.status(201).json({ movieId: movie._id });
  } catch (err) {
    //const errors = registerErrors(err); need to handle error for List
    res.status(200).send({ err });
  }
};

//////////////// A REVOIR car les movie ne contiennent pas le userId mais le listId !!!!
/////////////// peut être pas nécessaire !

module.exports.listMovie = async (req, res) => {
  if (!ObjectID.isValid(req.params.listId)) {
    return res.status(400).send("listID unknown: " + req.params.listId);
  }

  await MovieModel.find({ listId: [req.params.listId] })
    .then((doc) => {
      if (!doc) {
        return res.send("Movies not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    });
};

module.exports.movieInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.movieId)) {
    return res.status(400).send("movieID unknown: " + req.params.movieId);
  }

  /* await MovieModel.findById(req.params.movieId)
    .then((doc) => {
      return res.send(doc);
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    }); */

  await MovieModel.findById(req.params.movieId)
    .then((doc) => {
      if (!doc) {
        return res.send("Movie not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    });
};

module.exports.updateMovie = async (req, res) => {
  if (!ObjectID.isValid(req.params.movieId)) {
    return res.status(400).send("movieID unknown: " + req.params.movieId);
  }

  await MovieModel.findOneAndUpdate(
    { _id: req.params.movieId },
    {
      $set: {
        movieName: req.body.movieName,
        apiMovieId: req.body.apiMovieId,
      },
    },
    { new: true, setDefaultsOnInsert: true, runValidators: true } // no upsert !
  )
    .then((doc) => {
      if (!doc) {
        return res.send("Movie not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

module.exports.deleteMovie = async (req, res) => {
  if (!ObjectID.isValid(req.params.movieId)) {
    return res.status(400).send("movieID unknown: " + req.params.movieId);
  }

  await MovieModel.deleteOne({ _id: req.params.movieId })
    .then((doc) => {
      if (doc.deletedCount < 1) {
        return res.send("Movie not found");
      } else {
        res.status(200).json({
          message: `${req.params.movieId}: Successfully deleted`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
