import { client } from "../index.js";

export async function updatMovieById(id, data) {
    return await client.db("practice").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("practice").collection("movies").deleteOne({ id: id });
}
export async function getMovies(request) {
    return await client.db("practice").collection("movies").find(request.query).toArray();
}
export async function insertMovies(data) {
    return await client.db("practice").collection("movies").insertMany(data);
}
export async function getMovieByID(id) {
    return await client.db("practice").collection("movies").findOne({ id: id });
}
