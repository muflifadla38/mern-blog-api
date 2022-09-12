const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: string,
    required: true,
  },
  body: {
    type: string,
    required: true,
  },
  // image: {},
  timestamps: true,
  author: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
