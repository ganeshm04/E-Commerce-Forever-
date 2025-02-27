import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected");
    }
    );
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;