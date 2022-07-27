const mongoose = require("mongoose");

const connetDB = () => {
    return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connetDB;
