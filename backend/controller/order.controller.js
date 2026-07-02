const Razorpay = require('razorpay');
const CartModel = require('../model/cart.model');
const orderModel = require('../model/order.model')

var instance = new Razorpay({
  key_id: process.env.razorPay_id,
  key_secret: process.env.razorPay_secret_key
});

const orderController ={
  async orderPlace(req,res){
    try {
         const {user_id,order_total,payment_mode,shipping_details} = req.body;
          
         const cart = await CartModel.find({user_id})
         .populate("product_id", "finalPrice _id");

          const product_details = cart.map((item)=>{
            return(
                {
                    product_id : item.product_id._id,
                    qty : item.qty,
                    price : item.product_id.finalPrice,
                    total :(item.product_id.finalPrice*item.qty)
                }
            )
          })

          const order = await orderModel.create({
            user_id:user_id,
            product_details :product_details,
            order_total :order_total,
            payment_mode:payment_mode,
            order_status:0,
            shipping_details: shipping_details

          })
          if(payment_mode==0){
            
             await order.save();
              await CartModel.deleteMany({user_id})
           
            res.status(201).json({
                success : true,
                msg : "order placed",
                order_id : order._id
            })

          }else{
              // Define order options
var options = {
    amount: order_total*100,
    currency: "INR",
    receipt: order._id
};

// Create order
instance.orders.create(options,async function (err, RazorPayorder) {
  if(err){
    res.status(500).json({
      success: false,
      msg : "order did't place"
    })
  }else{
    order.razorpay_order_id = RazorPayorder.id
    await order.save()
     res.status(201).json({
                success : true,
                msg : "order placed",
                order_id : order._id,
                razorpay_order_id : RazorPayorder.id
            })
  }
});

          }
        
    } catch (error) {
        console.log(error)
         res.status(500).json({
            success : false,
            msg : "internal server error"
        })
    }
  }
}

module.exports = orderController