const { validationResult } = require("express-validator");

exports.login = (req, res, next) => {
  nama = req.body.name;
  email = req.body.email;
  password = req.body.password;

  res.status(201).json({
    message: "Login Success",
    data: {
      uid: 1,
      name: nama,
      email: email,
    },
  });
  next();
};

exports.register = (req, res, next) => {
  const errors = validationResult(req); //Validation error results
  const nama = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const result = {
    message: "Register Success",
    data: {
      uid: 1,
      name: nama,
      email: email,
    }};

  res.status(201).json(result);
  next();
};