const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlemgth: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      max: 1024,
    },

    //refreshToken: String,

    list: {
      type: Array,
    },

    /*     parameters:{
        need to be defined
    } */
  },

  {
    timestamps: true,
  }
  /* {
    virtual: {
      id: {
        get() {
          return this._id;
        },
      },
    },
  } */
);

// execute function before save into DB

/* userSchema.virtual("id").get(function () {
  return this._id;
}); */

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    } else {
      throw Error("Inccorect password");
    }
  } else {
    throw Error("Incorrect username");
  }
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
