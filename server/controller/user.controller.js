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

  UserModel.findById(req.params.id)
    .select("-password")
    .then((doc) => {
      return res.send(doc);
    })
    .catch((err) => {
      console.log("ID unknown: " + err);
    });
};
