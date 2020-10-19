const productController = require("../controller/product");
const express = require("express");
const router = express.Router();

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null ,new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storage });

const { requireSignin, isAuth, isAdmin, userById} = require('../controller/user');

router.post("/create/:userById", requireSignin, isAuth, isAdmin, upload.single('productImage'), productController.create);
router.param("userById", userById);


module.exports = router;
