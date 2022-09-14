const express = require("express");
const { body } = require("express-validator");
const blogController = require("../controllers/blog");

const router = express.Router();

//Get all posts
router.get("/posts", blogController.getPosts);

//Get Detail Post
router.get("/post/:postId", blogController.getPostById);

//Create a post
router.post(
  "/create-post",
  [
    body("title").isLength({ min: 8 }).withMessage("Input Title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input Body tidak sesuai"),
  ],
  blogController.createPost
);

//Update a post
router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 8 }).withMessage("Input Title tidak sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Input Body tidak sesuai"),
  ],
  blogController.updatePost
);

// Delete a post
// router.delete("/post/{id}", blogController.deletePost);

module.exports = router;
