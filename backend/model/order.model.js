const mongoose = require('mongoose')
const { Schema } = mongoose;

// Product details schema
const productDetailsSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "product", required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
}, { _id: false });

// Shipping details schema
const shippingDetailsSchema = new Schema({
  name: { type: String },
  contact: { type: String },
  street: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

// Main order schema
const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  product_details: { type: [productDetailsSchema], required: true },
  order_total: { type: Number, required: true },
  payment_mode: { type: Number, required: true }, // 1 = prepaid, 0 = COD
  razorpay_order_id: { type: String, default: null },
  razorpay_payment_id: { type: String, default: null },
  order_status: { 
    type: Number, 
    enum: [0, 1, 2, 3, 4, 5, 6, 7], 
    default: 0 
    // 0 = placed, 1 = confirmed, 2 = shipped, 3 = out for delivery, 4 = delivered, 5 = cancelled, 6 = returned, 7 = refunded
  },
  shipping_details: { type: shippingDetailsSchema, required: true },
}, { timestamps: true });

const orderModel= mongoose.model("Order", orderSchema);
module.exports = orderModel
