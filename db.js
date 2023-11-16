import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbconnect = () => {
  const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.DB_URL, connectionParams);
  //connecting
  mongoose.connection.on("connected", () => {
    console.log("connected to the database successfully");
  }),
    //errors
    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to the database: " + err);
    });
  //disconnecting
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected to the database successfully");
  });
};

export default dbconnect;
