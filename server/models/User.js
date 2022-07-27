const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    events: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Please Enter Email"],
        validate: [validateEmail, "Please Enter Valid Email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [8, "Password Required Min 8 Character"],
        maxlength: [16, "Password Required Min 16 Character"],
    },
    tickets: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.isValidPass = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
    const token = jwt.sign(
        { userId: this._id, email: this.email, name: this.name },
        process.env.SECRET,
        { expiresIn: "3d" }
    );
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
