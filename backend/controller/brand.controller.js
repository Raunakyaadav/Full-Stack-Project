const BrandModel = require("../model/brand.model");
const { generateUniqueImageName } = require("../utility/helper");

const BrandController = {
  async create(req, res) {
    try {
      const { name, slug } = req.body;
      const BrandImage = req.files?.image;

      if (!name || !slug || !BrandImage) {
        return res.status(400).json({
          msg: "All fields are required",
          success: false,
        });
      }

      const newImageName = generateUniqueImageName(BrandImage.name);
      const destination = "./public/images/brand/" + newImageName;

      await BrandImage.mv(destination, (err) => {
        if (err) {
          return res.status(400).json({
            msg: "Error uploading brand image",
            success: false,
          });
        }
      });

      const brand = new BrandModel({
        name,
        slug,
        image: newImageName,
      });

      await brand.save();

      return res.status(201).json({
        msg: "brand created successfully",
        success: true,
        brand,
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
      const brand = await BrandModel.find();
      if (brand) {
        return res.status(201).json({
          msg: "brand found",
          success: true,
          brand
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
      const data = await BrandModel.findById(id);
      if (data) {
        return res.status(201).json({
          msg: "brand found",
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
      const BrandImage = req.files?.image;

      // Prepare update object
      let updateData = {};

      if (name) updateData.name = name;
      if (slug) updateData.slug = slug;

      if (categoryImage) {
        const newImageName = generateUniqueImageName(BrandImage.name);
        const destination = "./public/images/brand/" + newImageName;

        // Move image
        await BrandImage.mv(destination, (err) => {
          if (err) {
            return res.status(400).json({
              msg: "Error uploading brand image",
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
      const brand = await BrandModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }, // return updated document
      );

      if (!brand) {
        return res.status(404).json({
          msg: "brand not found",
          success: false,
        });
      }

      return res.status(200).json({
        msg: "brand updated successfully",
        success: true,
        brand
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
      await BrandModel.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        msg: "Brand deleted",
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
      const brand = await BrandModel.findById(id);
      await BrandModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: !brand.status,
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

module.exports = BrandController;