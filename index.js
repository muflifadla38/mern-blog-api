const express = require("express");
const bodyParser = require("body-parser");
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

app.listen(4000);
