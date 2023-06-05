const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/usersRoute");
const sequelize = require("./config/database");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/", userRoutes);
dotenv.config();

//Database Connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => console.log("Error connecting database", error));

//server PORT
app.listen(process.env.DEVELOPMENT_PORT, () =>
    console.log(`Running on port ${process.env.DEVELOPMENT_PORT}`)
);
