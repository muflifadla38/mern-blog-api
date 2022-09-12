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
  const nama = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
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