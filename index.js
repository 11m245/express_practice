// const express = require("express");
// if type : "commonjs" in package.json old import
import express from "express"; // if type : "module" new type import
import { MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.route.js";
import usersRouter from "./routes/users.route.js";
import * as dotenv from 'dotenv';
import bcrypt from "bcrypt";
dotenv.config();

const app = express();
const PORT = process.env.PORT;


//mongodb connection
// const MONGO_URL = "mongodb://127.0.0.1:27017";
const MONGO_URL = process.env.MONGO_URL;
// console.log(process.env.MONGO_URL);
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongo is connected");

app.use(express.json()); // middleware for all post requests to convert json data from body into JS Object

app.get("/", function (request, response) {
    response.send(" hello world, welcome to api homepage");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log("server started in", PORT));

// async function generateHashedPassword(password) {
//     const NO_OF_ROUNDS = 10;
//     const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log(salt);
//     console.log(hashedPassword);
//     return hashedPassword;
// }

// generateHashedPassword("password@123");

export { client }

