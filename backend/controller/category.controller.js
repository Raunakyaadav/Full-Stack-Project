const CategoryModel = require("../model/category.model");
const ProductModel = require("../model/product.model");
const { generateUniqueImageName } = require("../utility/helper");

const CategoryController = {
  async create(req, res) {
    try {
      const { name, slug } = req.body;
      const categoryImage = req.files?.image;

      if (!name || !slug || !categoryImage) {
        return res.status(400).json({
          msg: "All fields are required",
          success: false,
        });
      }

      const newImageName = generateUniqueImageName(categoryImage.name);
      const destination = "./public/images/category/" + newImageName;

      await categoryImage.mv(destination, (err) => {
        if (err) {
          return res.status(400).json({
            msg: "Error uploading category image",
            success: false,
          });
        }
      });

      const category = new CategoryModel({
        name,
        slug,
        image: newImageName,
      });

      await category.save();

      return res.status(201).json({
        msg: "Category created successfully",
        success: true,
        category,
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
      const data =[];
      const category = await CategoryModel.find();

      const promise =
        category.map(async (cat) => {
          const productCount = await ProductModel.findOne({ categoryId: cat._id }).countDocuments();
          data.push({...cat.toJSON(),productCount})
        })
        await Promise.all(promise)
      ;
      if (category) {
        return res.status(201).json({
          msg: "category found",
          success: true,
          category: data
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
      const data = await CategoryModel.findById(id);
      if (data) {
        return res.status(201).json({
          msg: "category found",
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
  async update(req, res) {
    try {
      const { name, slug } = req.body;
      const id = req.params.id;
      const categoryImage = req.files?.image;

      // Prepare update object
      let updateData = {};

      if (name) updateData.name = name;
      if (slug) updateData.slug = slug;

      if (categoryImage) {
        const newImageName = generateUniqueImageName(categoryImage.name);
        const destination = "./public/images/category/" + newImageName;

        // Move image
        await categoryImage.mv(destination, (err) => {
          if (err) {
            return res.status(400).json({
              msg: "Error uploading category image",
              success: false,
            });
          }
        });

        updateData.image = newImageName;
      }

      // If nothing to update
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          msg: "No fields provided to update",
          success: false,
        });
      }

      // Update category
      const category = await CategoryModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }, // return updated document
      );

      if (!category) {
        return res.status(404).json({
          msg: "Category not found",
          success: false,
        });
      }

      return res.status(200).json({
        msg: "Category updated successfully",
        success: true,
        category,
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Server error",
        success: false,
        error: err.message,
      });
    }
  },
  async deleted(req, res) {
    try {
      const id = req.params.id;
      const category = await CategoryModel.findById(id);
      await CategoryModel.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        msg: "Category deleted",
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
      const category = await CategoryModel.findById(id);
      await CategoryModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: !category.status,
          },
        },
      );
      return res.status(200).json({
        msg: "status updated successfully",
        success: true,
      });
    } catch {}
  },
};

module.exports = CategoryController;
