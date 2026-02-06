import mongoose from "mongoose";

export const connectMongoDb = async () => {
    //importing mongo uri form dot env file
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI is missing in .env");
    }
    try {
        mongoose.set("strictQuery", true);

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}