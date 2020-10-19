const productModel=require('../models/product');


exports.create=async(req,res)=>
{
    try{
        console.log(req.file);
        var name=req.body.name;
        var description=req.body.description;
        var quantity=req.body.quantity;
        var price = req.body.price;
        var category = req.body.category;
        const product=new productModel({name,description,quantity,price,category});
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