const express = require("express");
const productController = require("../controllers/products");

const router = express.Router();

router.get("/products", productController.getAllProduct); //Read product
router.post("/product", productController.createProduct); //Create product

// router.put('/product', productController); //Update product
// router.delete('/product', productController); //Delete product

module.exports = router;
