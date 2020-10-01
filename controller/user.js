const userModel = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try{
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        
        await userModel.findOne({email}, async (err,userResult)=>{
            if (err)
                throw err
            else{
                if(!userResult){
                    await bcrypt.hash(password, 10, async (err,hash_pass)=>{
                        if(err)
                            throw err;
                        else{
                            const user = new userModel({name,email,hash_pass});
                            await user.save((err,result)=>{
                                if(err){
                                    throw err;
                                }
                                else{
                                    res.json(result);
                                }
                            });
                        }
                    });
                }
                else{
                    res.json({msg: "user already exists"});
                }
            }
        });
    }
    catch(err){
        throw err
    }
}

//FOR LOGIN
exports.login = async (req, res) => {

    try{
            var email = req.body.email;
            var password = req.body.password;

    await userModel.findOne({email}, async (err,userResult)=>{
        if(err){
            throw err;
        }
        else{
            if(!userResult)
            {    
                 res.json({msg:"USER DOESNOT EXIST"});
            }
            else{
                   if(await bcrypt.compare(password, userResult.hash_pass))
                {
                    const token = jwt.sign({_id: userResult._id, username: userResult.email}, process.env.JWT_SECRET, {expiresIn: '2h'});
                    res.cookie('t', token, { expire: new Date() + 999999});
                    res.json({token,userResult})   
                }
                else
                {
                    res.json({msg:"wrong password"})
                }
            }
        }
    });
}
catch(err){
    throw err
}
} 
