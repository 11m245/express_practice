import express from "express";
import bcrypt from "bcrypt";
import { addUser, getUserByUsername } from "../services/users.service.js";
import jwt from "jsonwebtoken";

const router = express.Router();

async function generateHashedPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(salt);
    // console.log(hashedPassword);
    return hashedPassword;
}


router.post("/signup", async function (request, response) {

    const { username, password } = request.body;
    console.log(request.body);
    const userFromDB = await getUserByUsername(username);
    // console.log(userFromDB);
    if (userFromDB) {
        response.status(400).send({ message: "username already exist try others" })
    } else if (password.length < 8) {
        response.status(400).send({ message: "password min 8 characters required" })
    } else {

        const hashedPassword = await generateHashedPassword(password);
        const result = await addUser({ username: username, password: hashedPassword });
        response.send(result);
    }

})

router.post("/login", async function (request, response) {

    const { username, password } = request.body;

    const userFromDB = await getUserByUsername(username);
    // console.log(userFromDB);
    if (!userFromDB) {
        response.status(401).send({ message: "invalid credentials try again" })
    } else {
        const storedDBPassword = userFromDB.password;
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
        console.log(isPasswordCheck);

        if (isPasswordCheck) {
            const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
            response.send({ message: "Successful Login", token: token });
        } else {
            response.status(401).send({ message: "invalid credentials try again" })
        }
    }

})


export default router;