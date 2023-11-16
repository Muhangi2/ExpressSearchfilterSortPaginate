import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  genre: { type: [String], required: true },
  rating: { type: Number, required: true },
});
export default mongoose.model("movie", movieSchema);
