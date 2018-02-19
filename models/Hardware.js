const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const hardwareSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  slug: String,

  manufacturer: {
    type: String,
    trim: true,
    required: "Manufacturer is required"
  },
  tags: [String],
  photo: String,
  released: Number
});

hardwareSchema.pre("save", async function(next) {
  //TODO add duplication check here
  if (!this.isModified("name")) {
    next();
    return next();
  }
  this.slug = slug(this.name);

  next();
});

module.exports = mongoose.model("Hardware", hardwareSchema);
