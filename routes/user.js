const userController = require('../controller/user');
const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');


router.post('/register',[
    
        check('email','PLEASE USE WRITE SYNTAX').isEmail().isLength({ min: 10, max: 30 }), 
        check('password','PASSWORD BETWEEN 8 TO 10').isLength({ min: 8, max: 10 })
        
],userController.register);
router.post('/login', userController.login);

module.exports = router;