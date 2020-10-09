const userController = require('../controller/user');
const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');


router.post('/register',[
        check('name','Wrong SYNTAX').isLength({ min: 5 }),
        check('email','PLEASE USE WRITE SYNTAX').isEmail().isLength({ min: 10 }), 
        check('password','PASSWORD BETWEEN 8 TO 10').isLength({ min: 8})
        
],userController.register);
router.post('/login',[
        check('email','PLEASE USE WRITE SYNTAX').isEmail().isLength({ min: 10}), 
        check('password','PASSWORD BETWEEN 8 TO 10').isLength({ min: 8 })
        
], userController.login);
router.post('/signout',userController.signout);

module.exports = router;