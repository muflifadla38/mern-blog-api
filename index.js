const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv").config({ path: ".env" });

// Import Routes
const productRoutes = require("./src/routes/products");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// Create express app
const app = express();

//Allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
  next();
});

//Parse body request (JSON)
app.use(bodyParser.json());

//Set image storage & format filename
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //File save location (root/images)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname); //File name format
  },
});

//Set file filter (only accept image file)
const fileFilter = (req, file, cb) => {
  const filter =
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg";
  filter ? cb(null, true) : cb(null, false);
};

// Upload image file (root/image), filter & single file (req.body.image)
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//Set static folder (root/images)
app.use("/images/", express.static(path.join(__dirname, "images")));

//Grouping Routes
app.use("/v1/customer/", productRoutes);
app.use("/v1/auth/", authRoutes);
app.use("/v1/blog/", blogRoutes);

// Error Handling
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  next();
});

//Connect to DB
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(4000);
    console.log("Connection Success");
  })
  .catch((err) => console.log(err));
