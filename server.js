import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbconnect from "./db.js";
import movierouter from "./routes/movierouter.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

dbconnect();

const port = 3000;

app.use("/api", movierouter);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
