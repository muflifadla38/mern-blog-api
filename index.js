const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import Routes
const productRoutes = require("./src/routes/products");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

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

//Grouping Routes
app.use("/v1/customer/", productRoutes);
app.use("/v1/auth/", authRoutes);
app.use("/v1/blog/", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  next();
});

mongoose
  .connect(
    "mongodb+srv://muflifadla:Bu1IjpXOTzlIuV4k@cluster0.7oolqag.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000);
    console.log("Connection Success");
  })
  .catch((err) => console.log(err));
