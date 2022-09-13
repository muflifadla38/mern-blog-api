const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    message: "Get all posts success",
    data: [
      {
        title: "Title Post 1",
        image: "imagefile.jpg",
        body: "lorem ipsum dolor sit amet",
      },
      {
        title: "Title Post 2",
        image: "imagefile.jpg",
        body: "lorem ipsum dolor sit amet dolo sit",
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req); //Validation error results
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body;

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  //Create post in DB
  const post = new BlogPost({
    title: title,
    body: body,
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
