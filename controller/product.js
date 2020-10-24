const productModel=require('../models/product');


exports.create=async(req,res)=>
{
    try{
        console.log(req.file);
        var name=req.body.name;
        var description=req.body.description;
        var quantity=req.body.quantity;
        var price = req.body.price;
       // var category = req.body.category;
       if(!req.file)
       {
           res.json({"msg":"please upload correct file"})
       }
       else{
        const product=new productModel({name,description,quantity,price});
        await product.save((err,data)=>
        {
            if(err)
            {
                throw err
            }
            else{
                res.json({data});
            }
        })
    }
}
    catch(err){
        throw err;
    }

}


exports.productById = async (req, res, next, id) => {
    try {
      
      await productModel.findById({ _id: id }, (err, product) => {
        if (err) {
          throw err;
        } else {
          if (!product) {
            res.json({ msg: "product not found" });
          } else {
           console.log(product);
            req.product =product;
            next();
          }
        }
      });
    } catch (err) {
      throw err;
    }
  }


  exports.read = async (req, res, next) => {
    try {
        var product=req.product;
        res.json({product});
    }
    catch(err)
    {
        throw err;
    }
}

exports.remove = async (req, res, next) => {
  try {
      var product=req.product;
      await productModel.remove({_id: product._id},(err,deletedProduct)=>
      {
        if (err)
        {
          throw err
        }
        else{
          res.json({"msg":"Product deleted successfully "});
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
    var productid=req.product._id;
    var updates=req.body;
    console.log(productid);

    await productModel.findByIdAndUpdate(productid, updates,(err,updatedProduct)=>
      {
        if (err)
        {
              throw err
        }
        else{
          res.json({"msg":"Product updated successfully ",updatedProduct});
        }
      });
      

  }
  catch(err){
      throw err;
  }
}

