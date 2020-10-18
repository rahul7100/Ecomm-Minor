const productController = require("../controller/product");
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin, userById} = require('../controller/user');

router.post("/create/:userById", requireSignin, isAuth, isAdmin, productController.create);
router.param("userById", userById);


module.exports = router;
