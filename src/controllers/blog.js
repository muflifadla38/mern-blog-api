const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

exports.getPosts = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Get all posts success",
        data: result,
      });
    })
    .catch((err) => next(err)); //Menampilkan error ke FE
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      //Check if post not found
      if (!result) {
        const error = new Error("Post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: "Get detail post success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req); //Validation error results

  //Check "body" validation error
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  //Check "file image" validation error
  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    throw err;
  }

  // Init title, image, body
  const title = req.body.title;
  const image = req.file.path; //url image
  const body = req.body.body;

  //Create post in DB
  const post = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: "Testing",
    },
  });

  //Save to DB
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Create post success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req); //Validation error results

  //Check "body" validation error
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  //Check "file image" validation error
  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    throw err;
  }

  // Init title, image, body, postId
  const title = req.body.title;
  const image = req.file.path; //url image
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      //Check if post not found
      if (!post) {
        const error = new Error("Post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }

      //Update post "result" in DB (post===result)
      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      //Show result to FE
      res.status(200).json({
        message: "Update post success",
        data: result,
      });
    })
    .catch((err) => next(err));
};
