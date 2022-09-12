const express = require("express");
const { body } = require("express-validator");
const blogController = require("../controllers/blog");

const router = express.Router();

//Get all posts
router.get("/posts", blogController.getPosts);

//Create a post
router.post(
  "/create-post",
  [
    body("title").isLength({ min: 8 }).withMessage("Input Title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input Body tidak sesuai"),
  ],
  blogController.createPost
);

// router.put("/post/{id}", blogController.updatePosts); //Update a post
// router.delete("/post/{id}", blogController.deletePosts); //Delete a post

module.exports = router;
