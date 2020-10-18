const userController = require("../controller/user");
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "Please write correct email").isEmail(),
    check("password", "PASSWORD length should be atleast 8").isLength({ min: 8 }),
  ],
  userController.register
);
router.post(
  "/login",
  [
    check("email", "Please write correct email").isEmail(),
    check("password", "PASSWORD length should be atleast 8").isLength({ min: 8 }),
  ],
  userController.login
);
router.post("/signout", userController.signout);

router.get(
  "/secret/:userById",
  userController.requireSignin,
  userController.isAuth,
  (req, res) => {
    res.json({ msg: "hello world", user: req.profile });
  }
);

router.param("userById", userController.userById);

module.exports = router;
