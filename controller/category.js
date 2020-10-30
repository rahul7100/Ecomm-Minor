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
                console.log(data);
            }
        })
    }
    catch(err){
        throw err;
    }
}


exports.categoryById = async (req, res, next, id) => {
    try {
      
      await categoryModel.findById({ _id: id }, (err, category) => {
        if (err) {
          throw err;
        } else {
          if (!category) {
            res.json({ msg: "category not found" });
          } else {
           console.log(category);
            req.category =category;
            next();
          }
        }
      });
    } catch (err) {
      throw err;
    }
  }


exports.remove = async (req, res, next) => {
    try {
        var category=req.category;
        await categoryModel.remove({_id: category._id},(err)=>
        {
          if (err)
          {
            throw err
          }
          else{
            res.json({"msg":"category deleted successfully "});
          }
        });
        
    }
    catch(err)
    {
        throw err;
    }
  }
  

exports.update=async(req,res,next)=>
{

  try{
    var categoryById=req.category._id;
    var updates=req.body;
    console.log(categoryById);

    await categoryModel.findByIdAndUpdate(categoryById, updates,(err,updatedcategory)=>
      {
        if (err)
        {
              throw err
        }
        else{
          res.json({"msg":"category updated successfully ",updatedcategory});
        }
      });
      

  }
  catch(err){
      throw err;
  }
}