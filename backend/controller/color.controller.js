const ColorModel = require("../model/color.model");

const ColorController = {
  async create(req, res) {
    try {
      const { name, slug ,hexcode} = req.body;
   

      if (!name || !slug || !hexcode) {
        return res.status(400).json({
          msg: "All fields are required",
          success: false,
        });
      }

      const colors = new ColorModel({
        name,
        slug,
        hexcode,
      });

      await colors.save();

      return res.status(201).json({
        msg: "color created successfully",
        success: true,
        colors,
      });
    } catch (err) {
      onsole.log(err)
      return res.status(500).json({
        msg: "Server error",
        success: false,
        error: err.message,
        c
      });
    }
  },
  async get(req, res) {
    try {
      const colors = await ColorModel.find();
      if (colors) {
        return res.status(201).json({
          msg: "color found",
          success: true,
          colors,
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
      const color = await ColorModel.findById(id);
      if (color) {
        return res.status(201).json({
          msg: "category found",
          success: true,
          color,
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
      const { name, slug ,hexcode } = req.body;
      const id = req.params.id;
     

      // Prepare update object
      let updateData = {};

      if (name) updateData.name = name;
      if (slug) updateData.slug = slug;
      if (hexcode) updateData.hexcode = hexcode;

    
// If nothing to update
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          msg: "No fields provided to update",
          success: false,
        });
      }

      // Update category
      const color = await ColorModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }, // return updated document
      );

      if (!color) {
        return res.status(404).json({
          msg: "color not found",
          success: false,
        });
      }

      return res.status(200).json({
        msg: "color updated successfully",
        success: true,
        color,
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
      const color = await ColorModel.findById(id);
      await ColorModel.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        msg: "color deleted",
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
      const color = await ColorModel.findById(id);
      await ColorModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: ! color.status,
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
};

module.exports = ColorController;