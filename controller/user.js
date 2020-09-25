const userModel = require('../models/user');
const bcrypt = require("bcrypt");


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