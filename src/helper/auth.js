const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
    issuer: "technicaltest",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};

const refreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1day",
    issuer: "technicaltest",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};


module.exports = { generateToken, refreshToken };