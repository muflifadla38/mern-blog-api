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
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;

  res.status(201).json({
    message: "Create post success",
    data: {
      title: title,
      image: image,
      body: body,
			created_at: "12/09/2022",
			author: {
				uid: 1,
				name: "Testing",
				email: "testing@gmail.com"
				}
    },
  });
};
