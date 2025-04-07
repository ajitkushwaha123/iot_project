import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username must be unique."],
      required: [true, "Username is required."],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [30, "Username cannot exceed 30 characters."],
    },
    name: {
      type: String,
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },
    email: {
      type: String,
      unique: [true, "Email must be unique."],
      required: [true, "Email is required."],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format."],
      trim: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long."],
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Phone number must be a valid 10-digit number."],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "delivery_agent", "admin"],
        message: "Role must be one of 'user', 'delivery_agent', or 'admin'.",
      },
      default: "owner",
    },
    profilePicture: {
      type: String,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/,
        "Profile picture must be a valid image URL.",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
