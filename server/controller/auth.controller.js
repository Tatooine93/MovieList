const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { registerErrors, loginErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000; // token valid for 3 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.create({ username, email, password });
    res.status(201).json({ userId: user._id });
  } catch (err) {
    const errors = registerErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.login(username, password);
    const token = createToken(user._id);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({ userId: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 1,
    sameSite: "None",
    secure: true,
  });
  /* res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
    sameSite: "None",
    secure: true,
  }); */
  //res.redirect('/login'); // pour que les requetes aboutissent avec postman
  res.sendStatus(204);
};
