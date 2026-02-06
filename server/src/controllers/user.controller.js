import fs from "fs";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const createUser = async (req, res) => {
  try {
    let avatarUrl = "";
    console.log(req.body,"hehehe")

    // If image uploaded of user then first i am uploading in on cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bnv/users",
        resource_type: "image",
      });

      avatarUrl = result.secure_url;

      // removing temp file
      fs.unlinkSync(req.file.path);
    }

    const user = await User.create({
      ...req.body,
      avatarUrl,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: "User not found" });
    }

    // oh its a new image , lets upload it to cloudinary 
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bnv/users",
        resource_type: "image",
      });

      user.avatarUrl = result.secure_url;

      // remove temp file
      fs.unlinkSync(req.file.path);
    }

    //Updating new those firld sent by admin to edit
    user.firstName = req.body.firstName ?? user.firstName;
    user.lastName = req.body.lastName ?? user.lastName;
    user.email = req.body.email ?? user.email;
    user.gender = req.body.gender ?? user.gender;
    user.status = req.body.status ?? user.status;
    user.location = req.body.location ?? user.location;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    //Building search query for database
    const query = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { gender: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    //Counting total matched users
    const total = await User.countDocuments(query);

    // Fetching paginated users
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const exportUsersCSV = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { gender: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(query);

    let csv = "Name,Email,Gender,Status,Location\n";

    users.forEach((u) => {
      csv += `"${u.firstName} ${u.lastName}","${u.email}","${u.gender}","${u.status}","${u.location}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
