const mongoose = require("mongoose");

// Define Shipping Address Schema
const ShippingAddressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    trim: true,
    required: [true, "State is required"],
  },
  postalCode: {
    type: String,
    trim: true,
    required: [true, "Postal Code is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
},
{_id:false});

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    
    },
    shipping_address: {
      type: [ShippingAddressSchema],
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);

// Export User Model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel
