const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    shortDescription: {
      type: String,
      maxLength: 200,
    },
    longDescription: {
      type: String,
      maxLengh: 1000,
    },
    originalPrice: {
      type: Number,
      default: 200,
    },
    discountPercentage: {
      type: Number,
      default: 5,
    },
    finalPrice: {
      type: Number,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
    brandId: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
    },
    colors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "colors",
      },
    ],
    thumbnail: {
      type: String,
      default: null,
    },
    images: {
    type: [String], // <-- array of strings
    default: []
  },
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Boolean,
      default: true,
    },
    topSelling: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
