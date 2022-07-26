const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  gitUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Projects", projectsSchema);
