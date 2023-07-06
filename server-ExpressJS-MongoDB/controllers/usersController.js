const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

// Create a USER
async function signUp(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Please enter a username and password" });
        }
        const checkUsername = await Model.findOne({
            where: { username: username },
        });
        if (checkUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const item = await Model.create({
            username: username,
            password: hashedPassword,
        });
        const user = await Model.findOne({ wehere: { username: username } });
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).send("Password is incorrect");
        } else if (passwordMatches) {
            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: "1h",
            });
            return res.status(201).json({
                status: "Successfully registered",
                data: item,
                token,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

//login User
async function signIn(req, res) {
    try {
        const { username, password } = req.body;
        console.log(username, password, "===hehe");
        if (!username) {
            return res.status(400).send("Username is required");
        }
        const user = await Model.findOne({ wehere: { username: username } });
        if (!user) {
            return res.status(404).send("User does not exist");
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).send("Password is incorrect");
        } else if (passwordMatches) {
            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: "1h",
            });
            res.json({ token: token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error: " + error.message);
    }
}

function protected(req, res) {
    res.json({ message: "Hello welcome to the protected router" });
}

module.exports = {
    signUp,
    signIn,
    protected,
};
