const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    listId: {
      type: String,
    },

    listName: {
      type: String,
    },

    userId: {
      type: String,
    },

    moviesId: {
      type: Array,
    },
  },

  {
    timestamps: true,
  }
);

const ListModel = mongoose.model("message", listSchema);

module.exports = ListModel;
