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

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg')
    {
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({ storage: storage,
fileFilter:fileFilter });

const { requireSignin, isAuth, isAdmin, userById} = require('../controller/user');

router.get("/read/:productById",productController.read);
router.post("/update/:productById",productController.update);
router.delete("/remove/:userById/:productById",requireSignin, isAuth,isAdmin,productController.remove);
router.post("/create/:userById", requireSignin, isAuth, upload.single('productImage'), productController.create);
router.param("userById", userById);
router.param("productById", productController.productById);


module.exports = router;
