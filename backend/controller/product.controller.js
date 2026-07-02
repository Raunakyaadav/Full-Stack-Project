const ProductModel = require("../model/product.model");
const CategoryModel = require("../model/category.model");
const BrandModel = require("../model/brand.model");
const ColorModel = require("../model/color.model");
const { generateUniqueImageName } = require("../utility/helper");

const ProductController = {
  async create(req, res) {
    try {
      const {
        name,
        slug,
        shortDescription,
        longDescription,
        originalPrice,
        discountPercentage,
        finalPrice,
        categoryId,
        brandId,
        colors,
        Status,
        stock,
        topSelling,
      } = req.body;
      const thumbnail = req.files?.thumbnail;

      if (
        !name ||
        !slug ||
        !shortDescription ||
        !longDescription ||
        !originalPrice ||
        !discountPercentage ||
        !finalPrice ||
        !categoryId ||
        !brandId ||
        !colors
      ) {
        return res.status(400).json({
          msg: "All fields are required",
          success: false,
        });
      }

      const newImageName = generateUniqueImageName(thumbnail.name);
      const destination = "./public/images/product/" + newImageName;

      await thumbnail.mv(destination, (err) => {
        if (err) {
          return res.status(400).json({
            msg: "Error uploading category image",
            success: false,
          });
        }
      });

      const product = new ProductModel({
        name,
        slug,
        shortDescription,
        longDescription,
        originalPrice,
        discountPercentage,
        finalPrice,
        categoryId,
        brandId,
        colors: JSON.parse(colors),
        thumbnail: newImageName,
      });

      await product.save();

      return res.status(201).json({
        msg: "Product created successfully",
        success: true,
        product,
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Server error",
        success: false,
        error: err.message,
      });
    }
  },
  async get(req, res) {
    try {
      
      const {categorySlug, colorSlug ,brandSlug,min,max} = req.query;
  
     const filterQuery ={};
      if(categorySlug){
         category = await CategoryModel.findOne({slug :categorySlug});
         filterQuery.categoryId = category._id;
      }
if(colorSlug){
  color = await ColorModel.findOne({slug:colorSlug});
 
  filterQuery.colors = color._id
}
if(brandSlug){
  brand = await BrandModel.findOne({slug:brandSlug});
  filterQuery.brandId = brand._id
}
if(min && max){
  
filterQuery.finalPrice = {
  $gte :min,
  $lte : max
}
}


      const product = await ProductModel.find(filterQuery).populate(["categoryId", "brandId", "colors"]);
      if (product) {
        return res.status(201).json({
          msg: "product found",
          success: true,
          product,
        });
      }
    } catch {
      return res.status(500).json({
        msg: "internal server error",
        success: false,
      });
    }
  },
  async getById(req, res) { 
    try {
      const id = req.params.id;
      const data = await ProductModel.findById(id).populate("categoryId").populate("brandId").populate("colors");
      if (data) {
        return res.status(201).json({
          msg: "product found",
          success: true,
          data,
        });
      }
    } catch {
      return res.status(500).json({
        msg: "internal server error",
        success: false,
      });
    }
  },

// Update Product

async update(req, res) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle thumbnail only if uploaded
    if (req.files?.thumbnail) {
      const thumbnail = req.files.thumbnail;
      const newImageName = generateUniqueImageName(thumbnail.name);
      const destination = "./public/images/product/" + newImageName;

      await thumbnail.mv(destination, (err) => {
        if (err) {
          return res.status(400).json({
            msg: "Error uploading product image",
            success: false,
          });
        }
      });

      updateData.thumbnail = newImageName;
    } else {
      // ⚡️ Important: remove thumbnail from updateData if not uploaded
      delete updateData.thumbnail;
    }

    // Parse colors if provided
    if (updateData.colors) {
      try {
        updateData.colors = JSON.parse(updateData.colors);
      } catch (err) {
        return res.status(400).json({
          msg: "Invalid colors format",
          success: false,
        });
      }
    }

    const product = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        msg: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Product updated successfully",
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      success: false,
      error: err.message,
    });
  }
}

,

  async deleted(req, res) {
    try {
      const id = req.params.id;

      await ProductModel.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        msg: "product deleted",
        success: true,
      });
    } catch {
      return res.status(500).json({
        mgs: "Server error",
        success: false,
      });
    }
  },
  async status(req, res) {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);
      await ProductModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: !product.status,
          },
        },
      );
      return res.status(200).json({
        msg: "status updated successfully",
        success: true,
      });
    } catch {
      return res.status(500).json({
        mgs: "Server error",
        success: false,
      });
    }
  },
  async stock(req, res) {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);
      await ProductModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            stock: !product.stock,
          },
        },
      );
      return res.status(200).json({
        msg: "status updated successfully",
        success: true,
      });
    } catch {
      return res.status(500).json({
        mgs: "Server error",
        success: false,
      });
    }
  },
  async topSelling(req, res) {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);
      await ProductModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            topSelling: !product.topSelling,
          },
        },
      );
      return res.status(200).json({
        msg: "status updated successfully",
        success: true,
      });
    } catch {
      return res.status(500).json({
        mgs: "Server error",
        success: false,
      });
    }
  },
  async images(req, res) {
    try {
      const images = req.files?.images;
     const filesArray = Array.isArray(images) ? images : [images];
      const id = req.params.id;
      const product = await ProductModel.findById(id);
     
      const imagesArray = product.images || [];
      const AllPromise = [];
      if (!images) {
        return res.status(400).json({
          msg: "No images provided",
          success: false,
        });
      }

      filesArray.map((image) => {
        const imageName = generateUniqueImageName(image.name);
        const destination = "./public/images/product/" + imageName;
        imagesArray.push(imageName);
        AllPromise.push(image.mv(destination));
      });
    
      await Promise.all(AllPromise);
      await ProductModel.findByIdAndUpdate(id, {
        $set: {
          images: imagesArray
        }
      })
      return res.status(200).json({
        msg: "images updated successfully",
        success: true,
      });

    } catch (err) {
      console.log("upload error",err);
      return res.status(500).json({
        msg: "Server error",
        success: false,
        error: err.message,
      });
    }
  },
};

module.exports = ProductController;
