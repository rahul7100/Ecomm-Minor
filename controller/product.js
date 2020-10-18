const productModel=require('../models/product');

exports.create=async(req,res)=>
{
    try{
        var name=req.body.name;
        var description=req.body.description;
        var quantity=req.body.quantity;
        const product=new productModel({name,description,quantity});
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
    catch(err){
        throw err;
    }
}