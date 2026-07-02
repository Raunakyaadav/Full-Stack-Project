
const CartModel = require('../model/cart.model')
const cart = {
    async dbtocart(req,res){
        try {
          
           const {cart,userId} = req.body
           const allPromise =   cart.map(
           async (item)=>{
             const  {productId,qty} = item

             const existItem =await CartModel.findOne({product_id :productId})
               if(existItem){
                existItem.qty += Number(qty)
                await existItem.save()
            }else{
                const cart = await CartModel.create({
                    user_id : userId,
                    product_id : productId,
                    qty : qty
                })
                await cart.save() ;
            }

            })
         await Promise.all(allPromise)
          res.status(200).json({
            msg : "cart created",
            success : true,
            cart : await CartModel.find({user_id : userId}).populate("product_id").populate("user_id")
          })



        } catch (error) {
            console.log(error)
        }
    },
     async addCart(req,res){
        try {
          
           const {productId,userId} = req.body
        
          const existItem =await CartModel.findOne({product_id :productId},{user_id : userId})
         
                const cart = await CartModel.create({
                    user_id : userId,
                    product_id : productId,
                   
                })
              await cart.save() ;
          res.status(200).json({
            msg : "cart created",
            success : true,
            cart : await CartModel.find({user_id : userId}).populate("product_id").populate("user_id")
          })

        } catch (error) {
            console.log(error)
        }
    },
    async deleteItem(req,res){
        try {
            const id = req.params.id
          
        
            // const cart =await CartModel.find()
            if(id){
                await CartModel.findByIdAndDelete(id)

             res.status(200).json({
                msg : "cart item deleted",
                success : true
             })
            }
        } catch (error) {
            console.log(error)
        }
    }

} 

module.exports = cart

 
