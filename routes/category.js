const categoryController = require("../controller/category");
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin, userById} = require('../controller/user');

router.post("/create/:userById", requireSignin, isAuth,  categoryController.create);
router.post("/update/:categoryById",categoryController.update);
router.delete("/remove/:userById/:categoryById",requireSignin, isAuth,isAdmin,categoryController.remove);
router.param("userById", userById);
router.param("categoryById", categoryController.categoryById);



module.exports = router;
