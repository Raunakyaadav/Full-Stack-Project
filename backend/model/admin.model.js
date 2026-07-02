const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin", // fixed role
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("admins", AdminSchema);

module.exports = AdminModel ;
