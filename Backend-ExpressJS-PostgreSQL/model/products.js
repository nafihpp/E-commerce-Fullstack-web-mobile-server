const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/database");

const Products = sequelize.define("Prodcuts", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
