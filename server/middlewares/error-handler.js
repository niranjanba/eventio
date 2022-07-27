const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    const customeError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        errorMsg: err.message || "Something wend wrong",
    };

    if (err.name === "CastError") {
        customeError.errorMsg = `Can not find the job with ${err.value}`;
        customeError.statusCode = 404;
    }
    if (err.name === "ValidationError") {
        customeError.errorMsg = `${Object.keys(err.errors).join(",")} required`;
        customeError.statusCode = 400;
    }
    if (err.code || err.code === 11000) {
        customeError.errorMsg = `The user with ${Object.keys(
            err.keyValue
        )} already exist`;
        customeError.statusCode = 400;
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    return res
        .status(customeError.statusCode)
        .json({ msg: customeError.errorMsg });
};

module.exports = errorHandler;
