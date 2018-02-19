const mongoose = require("mongoose");
const Hardware = mongoose.model("Hardware");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "Invalid file type" }, false);
    }
  }
};

exports.homePage = (req, res) => {
  res.render("index");
};

exports.upload = multer(multerOptions).single("photo");

exports.resize = async (req, res, next) => {
  //If there is no new file
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split("/")[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  //resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(1024, jimp.AUTO);
  //write to filesystem
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.addHardware = (req, res) => {
  res.render("editHardware", { title: "Add Hardware" });
};

exports.createHardware = async (req, res) => {
  const hardware = new Hardware(req.body);
  await hardware.save();
  req.flash("success", `Succsesfully saved ${hardware.name}`);
  res.redirect("/add");
};

exports.getHardware = async (req, res) => {
  const hardware = await Hardware.find();

  res.render("browse", { title: "Browse", hardware: hardware });
};

exports.editHardware = async (req, res) => {
  const hardware = await Hardware.findOne({ _id: req.params.id });

  res.render("editHardware", {
    title: `Edit ${hardware.name}`,
    hardware: hardware
  });
};

exports.updateHardware = async (req, res) => {
  const hardware = await Hardware.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).exec();
  req.flash("success", `Successfully updated ${hardware.name}`);
  res.redirect(`/hardware/${hardware._id}/edit`);
};

exports.getHardwareBySlug = async (req, res, next) => {
  const hardware = await Hardware.findOne({ slug: req.params.slug });
  if (!hardware) return next();
  res.render("hardware", { hardware, title: hardware.name });
};
