exports.getAllProduct = (req, res, next) => {
  res.json({
    message: "Get all product success",
    data: [
      {
        id: 1,
        name: "Product Get All",
        price: 2000,
      },
    ],
  });
  next();
};

exports.createProduct = (req, res, next) => {
  const nama = req.body.name;
  const price = req.body.price;
  res.json({
    message: "Create product success",
    data: {
      id: 1,
      name: nama,
      price: price,
    },
  });
  next();
};
