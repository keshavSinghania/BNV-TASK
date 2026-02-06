import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minlength: [2, "First name must be atleast of 2 characters"],
        maxlength: [50, "First name must be at most 50 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minlength: [2, "First name must be atleast of 2 characters"],
        maxlength: [50, "First name must be at most 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: [true, "Mobile is required"],
        trim: true,
        minlength: [10, "Mobile must of at least 10 digits"],
        maxlength: [15, "Mobile must be of at most 15 digits"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ["Male", "Female", "Other"],
            message: "Gender must be Male , Female Or Other",
        },
    },
    status: {
        type: String,
        enum: {
            values: ["Active", "Inactive"],
            message: "Status must be Active or Inactive",
        },
        default: "Active",
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
        maxlength: [100, "Location must be at most 100 characters"],
    },
    avatarUrl: {
        type: String,
        trim: true,
        default: "",
    },
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User;