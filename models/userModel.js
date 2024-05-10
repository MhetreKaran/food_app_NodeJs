const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dprofile%2Bicon&psig=AOvVaw11oxB4Iwggxz5CIvnUQmUr&ust=1715250483044000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPi05ZLs_YUDFQAAAAAdAAAAABAR",
    },
  },
  { timestamps: true }
);
//exports
module.exports = mongoose.model("User", userSchema);
