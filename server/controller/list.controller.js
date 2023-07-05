const ListModel = require("../models/list.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.createList = async (req, res) => {
  if (!ObjectID.isValid(req.body.userId)) {
    return res.status(400).send("userID unknown: " + req.body.userId);
  }

  const { listName, userId } = req.body;

  try {
    const list = await ListModel.create({ listName, userId });
    res.status(201).json({ listId: list._id });
  } catch (err) {
    //const errors = registerErrors(err); need to handle errors for Movies
    res.status(200).send({ err });
  }
};

module.exports.userList = async (req, res) => {
  if (!ObjectID.isValid(req.params.userId)) {
    return res.status(400).send("userID unknown: " + req.params.userId);
  }

  await ListModel.find({ userId: [req.params.userId] })
    .then((doc) => {
      if (!doc) {
        return res.send("List not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    });
};

module.exports.listInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.listId)) {
    return res.status(400).send("listID unknown: " + req.params.listId);
  }

  await ListModel.findById(req.params.listId)
    .then((doc) => {
      if (!doc) {
        return res.send("List not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    });
};

module.exports.updateList = async (req, res) => {
  if (!ObjectID.isValid(req.params.listId)) {
    return res.status(400).send("listID unknown: " + req.params.listId);
  }

  await ListModel.findOneAndUpdate(
    { _id: req.params.listId },
    {
      $set: {
        listName: req.body.listName,
      },
    },
    { new: true, setDefaultsOnInsert: true, runValidators: true } // no upsert !!
  )
    .then((doc) => {
      if (!doc) {
        return res.send("List not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

module.exports.deleteList = async (req, res) => {
  if (!ObjectID.isValid(req.params.listId)) {
    return res.status(400).send("listID unknown: " + req.params.listId);
  }

  await ListModel.deleteOne({ _id: req.params.listId })
    .then((doc) => {
      if (doc.deletedCount < 1) {
        return res.send("List not found");
      } else {
        res.status(200).json({
          message: `${req.params.listId}: Successfully deleted`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
