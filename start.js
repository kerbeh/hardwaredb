//Import the enviroment vars for the express app
require("dotenv").config({ path: "./config/variables.env" });

const mongoose = require("mongoose");

//connect to DB
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`🚨 ${err.message}`);
});

/**
 * Import models
 */
require("./models/Hardware");
