// const express = require("express");
// if type : "commonjs" in package.json old import
import express from "express"; // if type : "module" new type import
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config()

// console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT;


//mongodb connection
// const MONGO_URL = "mongodb://127.0.0.1:27017";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongo is connected");

app.use(express.json()); // middleware for all post requests to convert json data from body into JS Object

app.get("/", function (request, response) {
    response.send(" hello world, welcome to api homepage");
});

app.get("/movies/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.findOne({ id:100 })
    const movie = await client.db("practice").collection("movies").findOne({ id: id });
    console.log(movie);
    movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
});

app.post("/movies", async function (request, response) {
    const data = request.body;
    // db.movies.insertMany(data)   // express.json() inbuilt middleware for json to JS Object conversion from body
    // console.log(data);      //app.use(express.json()) applied to all post requests
    const result = await client.db("practice").collection("movies").insertMany(data);

    response.send(result);
});

// app.get("/movies", async function (request, response) {
//     // db.movies.find({ })
//     const movies = await client.db("practice").collection("movies").find({}).toArray();
//     console.log(movies);
//     response.send(movies);
// });

app.get("/movies", async function (request, response) {

    if (request.query.rating) {
        request.query.rating = + request.query.rating;
    }
    console.log(request.query);
    // db.movies.find({ })
    const movies = await client.db("practice").collection("movies").find(request.query).toArray();
    console.log(movies);
    response.send(movies);
});

app.delete("/movies/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.deleteOne({ id:100 })
    const result = await client.db("practice").collection("movies").deleteOne({ id: id });
    console.log(result);
    result.deletedCount > 0 ? response.send(result) : response.status(404).send({ message: "movie not found" });
});

app.put("/movies/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    // db.movies.updateOne({ id:100 },{$set:{rating:9}})
    const result = await client.db("practice").collection("movies").updateOne({ id: id }, { $set: data });
    response.send(result);
});

app.listen(PORT, () => console.log("server started in", PORT));

