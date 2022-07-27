const User = require("../models/User");
const dashboard = async (req, res, next) => {
    try {
        const events = await User.findById({ _id: req.user._id })
            .populate("events")
            .select({ events: 1 });
        res.status(200).json({ data: events });
    } catch (error) {
        next(error);
    }
};
const getTickets = async (req, res, next) => {
    try {
        const tickets = await User.findById({ _id: req.user._id })
            .populate({
                path: "tickets",
                select: { _id: 1, EventName: 1, StartDate: 1, EndDate: 1 },
            })
            .select({ _id: 1, EventName: 1, StartDate: 1, EndDate: 1 });
        res.status(200).json({
            data: tickets,
            msg: "fetched tickets successfully",
        });
    } catch (error) {
        next(error);
    }
};
module.exports = { dashboard, getTickets };
