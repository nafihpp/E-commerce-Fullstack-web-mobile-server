const { default: mongoose } = require("mongoose");

const db = () => {
    const { connection } = mongoose.connect(process.env.MONGO_URI);
};
