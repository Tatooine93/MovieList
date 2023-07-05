const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

/* module.exports.refresh = async (req, res) => {
  res.sendStatus(200);
}; */

module.exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  /* UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      console.log("ID unknown :" + err);
    }
  }).select("-password"); */

  await UserModel.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.send("User not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    });
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  /* try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        }
        if (err) {
          return res.status(500).send({ message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  } */

  await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username,
      },
    },
    { new: true, setDefaultsOnInsert: true, runValidators: true } // no upsert !!
  )
    .select("-password")
    .then((doc) => {
      if (!doc) {
        return res.send("User not found");
      } else {
        return res.send(doc);
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });

  /* try {
    const doc = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );
    return res.send(doc);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } */
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  await UserModel.deleteOne({ _id: req.params.userId })
    .then((doc) => {
      if (doc.deletedCount < 1) {
        return res.send("User not found");
      } else {
        res.status(200).json({
          message: `${req.params.userId}: Successfully deleted`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
