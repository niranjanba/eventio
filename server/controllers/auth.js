const { BadRequestError, UnAuthorizedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        const token = user.createToken();
        const { name, _id } = user;
        const userObj = { name: name, userId: _id };
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.status(StatusCodes.CREATED).json({
            msg: "Registration Successful",
            data: userObj,
        });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError("Please Enter all the details");
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new UnAuthorizedError("Email does not exist");
        }
        const isValidUser = await user.isValidPass(password);
        if (!isValidUser) {
            throw new UnAuthorizedError("Email or Password is Incorrect");
        }
        const token = user.createToken();
        const { name, _id } = user;
        const userObj = { name: name, userId: _id };
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.status(StatusCodes.OK).json({
            msg: `Welcom back, ${user.name}`,
            data: userObj,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
