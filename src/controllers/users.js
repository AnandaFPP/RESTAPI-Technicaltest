const { createUser, findUserByName } = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

let usersController = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_password } = req.body;
      const { rowCount } = await findUserByName(user_name);
      if (rowCount) {
        return res.json({ message: "Email is already taken" });
      }
      // const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(user_password);
      const user_id = uuidv4();
      const data = {
        user_id,
        user_name,
        passwordHash,
      };

      await createUser(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            201,
            "User created successfully!"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  loginUser: async (req, res) => {
    const { user_name, user_password } = req.body;
    const {
      rows: [user],
    } = await findUserByName(user_name);

    if (!user) {
      return res.json({ message: "User's name is incorrect!" });
    }

    const isValidPassword = bcrypt.compareSync(
      user_password,
      user.user_password
    );
    if (!isValidPassword) {
      return res.json({ message: "Wrong password!" });
    }

    delete user.password;

    const payload = {
      user_name: user.user_name,
    };

    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.refreshToken(payload);

    commonHelper.response(res, user, 201, "Login successful!");
  },

  profileUser: async (req, res) => {
    const user_name = req.payload.user_name;
    const {
      rows: [user],
    } = await findUserByName(user_name);
    delete user.password;

    commonHelper.response(res, user, 200);
  },

  refreshToken: (req, res) => {

    // console.log(req.payload);
    const payload = {
      user_name: req.payload.user_name,
    };

    const result = {
      user_name: req.payload.user_name,
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };

    commonHelper.response(res, result, 200, "Token already generate!");
  },
};

module.exports = usersController;
