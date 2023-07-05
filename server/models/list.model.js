const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const ListModel = mongoose.model("list", listSchema);

module.exports = ListModel;
