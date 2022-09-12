const express = require("express");
const blogController = require("../controllers/blog");

const router = express.Router();

router.get("/posts", blogController.getPosts); //Get all posts
router.post("/create-post", blogController.createPost); //Create a post
// router.put("/post/{id}", blogController.updatePosts); //Update a post
// router.delete("/post/{id}", blogController.deletePosts); //Delete a post

module.exports = router;
