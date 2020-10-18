const mongoose=require('mongoose');

const productSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true

        },
        description:
        {
            type:String,
            required:true
        },
        quantity:
        {
            type:Number,
            required:true
        }
    },{timestamps:true});

    const user = new mongoose.model("products", productSchema);
    module.exports = user;
