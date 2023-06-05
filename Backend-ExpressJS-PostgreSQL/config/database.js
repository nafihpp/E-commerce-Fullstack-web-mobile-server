const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: "ecommerce",
    username: "postgres",
    password: "Nafihpp@123",
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize;
