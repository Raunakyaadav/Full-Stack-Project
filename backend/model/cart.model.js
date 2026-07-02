const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true
    },
    product_id:{
        type : mongoose.Schema.ObjectId,
        ref :"product",
        required : true
    },
    qty :{
        type : Number,
        required:true,
        default :1,
        min :1,
        
    }
},{
    timestamps : true
})

const CartModel = mongoose.model("cart",cartSchema);
module.exports = CartModel ; 