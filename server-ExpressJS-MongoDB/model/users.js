const { mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        autoIncrement: true,
    },
    username: {
        type: String,
        requied: true,
    },
    password: {
        type: String,
        requied: true,
    },
});

module.exports = {
    Users: mongoose.model("users", UserSchema),
};
