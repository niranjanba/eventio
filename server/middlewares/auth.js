const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { UnAuthorizedError, BadRequestError } = require("../errors");

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(payload.userId).select({
            password: 0,
        });
        req.user = user;
    } else {
        throw new BadRequestError("bad request");
    }
    next();
};

module.exports = auth;
