import mongoose from "mongoose";
export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGOURL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to Database");
    });
    connection.on("error", () => {
      console.log("Error in mongodb connection");
      process.exit();
    });
  } catch (error) {
    console.log("error");
  }
}