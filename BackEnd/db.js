import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB Connected");
    })
    .catch(() => {
      console.log("Faild to Connect");
    });
};

export default dbConnect;
