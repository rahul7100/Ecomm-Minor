const categoryModel = require('../models/category');


exports.create = async (req, res) => {
    try{
        var name = req.body.name;
        const category = new categoryModel({name});
        await category.save((err, data)=>{
            if(err){
                throw err;
            }
            else{
                res.json({data});
            }
        })
    }
    catch(err){
        throw err;
    }
}
