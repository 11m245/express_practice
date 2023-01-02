import express from "express";
import { getMovieByID, insertMovies, getMovies, deleteMovieById, updatMovieById } from "../services/movies.service.js";

const router = express.Router();

router.get("/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.findOne({ id:100 })
    const movie = await getMovieByID(id);
    console.log(movie);
    movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
});

router.post("/", async function (request, response) {
    const data = request.body;
    // db.movies.insertMany(data)   // express.json() inbuilt middleware for json to JS Object conversion from body
    // console.log(data);      //app.use(express.json()) applied to all post requests
    const result = await insertMovies(data);

    response.send(result);
});

// app.get("/movies", async function (request, response) {
//     // db.movies.find({ })
//     const movies = await client.db("practice").collection("movies").find({}).toArray();
//     console.log(movies);
//     response.send(movies);
// });

router.get("/", async function (request, response) {

    if (request.query.rating) {
        request.query.rating = + request.query.rating;
    }
    console.log(request.query);
    // db.movies.find({ })
    const movies = await getMovies(request);
    console.log(movies);
    response.send(movies);
});

router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.deleteOne({ id:100 })
    const result = await deleteMovieById(id);
    console.log(result);
    result.deletedCount > 0 ? response.send(result) : response.status(404).send({ message: "movie not found" });
});

router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    // db.movies.updateOne({ id:100 },{$set:{rating:9}})
    const result = await updatMovieById(id, data);
    response.send(result);
});

export default router;


