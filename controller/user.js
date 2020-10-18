const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const exp_jwt = require("express-jwt");

//FOR REGISTRATION
exports.register = async (req, res) => {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      await userModel.findOne({ email }, async (err, userResult) => {
        if (err) throw err;
        else {
          if (!userResult) {
            await bcrypt.hash(password, 10, async (err, hash_pass) => {
              if (err) throw err;
              else {
                const user = new userModel({ name, email, hash_pass });
                await user.save((err, result) => {
                  if (err) {
                    throw err;
                  } else {
                    res.json(result);
                  }
                });
              }
            });
          } else {
            res.json({ msg: "user already exists" });
          }
        }
      });
    }
  } catch (err) {
    throw err;
  }
};

//FOR LOGIN
exports.login = async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      await userModel.findOne({ email }, async (err, userResult) => {
        if (err) {
          throw err;
        } else {
          if (!userResult) {
            res.json({ msg: "USER DOESNOT EXIST" });
          } else {
            if (await bcrypt.compare(password, userResult.hash_pass)) {
              const token = jwt.sign(
                { _id: userResult._id, username: userResult.email },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
              );
              res.cookie("t", token, { expire: new Date() + 999999 });
              res.json({ token, userResult });
            } else {
              res.json({ msg: "wrong password" });
            }
          }
        }
      });
    }
  } catch (err) {
    throw err;
  }
};

//FOR SIGNOUT

exports.signout = async (req, res, next) => {
  try {
    res.clearCookie("t");
    res.json({ msg: "SIGNOUT SUCCESSFUL" });
  } catch (err) {
    throw err;
  }
};

exports.requireSignin = exp_jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.userById = async (req, res, next, id) => {
  try {
    await userModel.findById({ _id: id }, (err, user) => {
      if (err) {
        throw err;
      } else {
        if (!user) {
          res.json({ msg: "user not found" });
        } else {
          req.profile = user;
          next();
        }
      }
    });
  } catch (err) {
    throw err;
  }
}

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Admin resourse! Access denied" });
  }
  next();
};
