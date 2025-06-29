import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("Faild to Connect");
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
