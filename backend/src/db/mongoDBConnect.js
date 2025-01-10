import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Database connected`);
    });
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.log("Error connecting to mongoDB");
    process.exit(1);
  }
};

export default connectMongoDB;
