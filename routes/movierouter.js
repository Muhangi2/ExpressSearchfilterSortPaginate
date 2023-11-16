import moviemodel from "../models/moviemodel.js";
import express from "express";
import movies from "file:///C:/Users/eliod/SearchApi/config/movies.json" assert { type: "json" };

const movierouter = express.Router();

movierouter.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];
    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    ///sorting
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    //
    let sortBy = {};
    if (sort[1]) {
      sortBy[(sort[0] = sort[1])];
    } else {
      sortBy[(sort[0] = "asc")];
    }

    const movies = await moviemodel
      .find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await moviemodel.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: false, message: "internal server error" });
  }
});

///am to create a function to insert the jsonfile documents into the model..!

// const insertmovies = async () => {
//   try {
//     const docs = await moviemodel.insertMany(movies);
//     return Promise.resolve(docs);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// insertmovies()
//   .then((docs) => console.log(docs))
//   .then((err) => console.log(err));

export default movierouter;
