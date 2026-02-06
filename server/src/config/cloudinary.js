import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

// 🔍 DEBUG: check env values (temporary)
dotenv.config()
console.log("Cloudinary ENV check:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY ? "✅ present" : "❌ missing",
  apiSecret: process.env.CLOUDINARY_API_SECRET ? "✅ present" : "❌ missing",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
