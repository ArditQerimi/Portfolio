const mongoose = require("mongoose");

// let Schema = mongoose.Schema,
//   ObjectId = Schema.ObjectId;

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  // _id: ObjectId,
});

module.exports = mongoose.model("Review", reviewSchema);
