import { client } from "../index.js";


export async function addUser(data) {
    return await client.db("practice").collection("users").insertOne(data);
}
export async function getUserByUsername(username) {
    return await client.db("practice").collection("users").findOne({ username: username });
}
