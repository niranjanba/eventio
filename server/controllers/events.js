const { Event, Tag } = require("../models/Event");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const mongoose = require("mongoose");
const User = require("../models/User");

const projections = {
    EventID: "$_id",
    _id: 0,
    EventName: 1,
    EventRegion: 1,
    StartDate: 1,
    EndDate: 1,
    StartTime: 1,
    EndTime: 1,
    Location: 1,
    Description: 1,
    By: 1,
    By: 1,
    EventType: 1,
    Tags: 1,
    Image: 1,
};

const getEvent = async (req, res, next) => {
    try {
        const { id: EventId } = req.params;
        const event = await Event.findOne({ _id: EventId })
            .populate({
                path: "Tags",
                select: { name: 1, _id: 0 },
            })
            .populate({
                path: "Bookings",
                select: { name: 1, email: 1, _id: 1 },
            });

        if (!event) {
            throw new BadRequestError("Event not found");
        }
        res.status(StatusCodes.OK).json({ msg: "single event", data: event });
    } catch (error) {
        next(error);
    }
};
const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find({}).populate({
            path: "Tags",
            select: { name: 1, _id: 0 },
        });
        res.status(StatusCodes.OK).json({ msg: "all events", data: events });
    } catch (error) {
        next(error);
    }
};
const addEvent = async (req, res, next) => {
    try {
        req.body.CreatedBy = req.user._id;
        const event = await Event.create(req.body);
        await addTags(event);
        await User.findByIdAndUpdate(
            { _id: req.user._id },
            { $push: { events: [event._id] } }
        );
        res.status(StatusCodes.CREATED).json({
            msg: "Created Event Successfully",
        });
    } catch (error) {
        next(error);
    }
};
const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(
            { _id: id },
            req.body,
            {
                runValidators: true,
                new: true,
            }
        );
        res.status(StatusCodes.OK).json({
            msg: "Updated Event",
            data: updatedEvent,
        });
    } catch (error) {
        next(error);
    }
};
const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(
            { _id: id },
            { new: true }
        );
        await User.findByIdAndUpdate(
            { _id: deletedEvent.CreatedBy },
            { $pull: { events: deletedEvent._id } },
            { new: true }
        );
        await User.updateMany(
            { tickets: { $in: [id] } },
            { $pull: { tickets: id } }
        );

        Tag.find({ events: { $in: [id] } }, async (err, data) => {
            for (let tag of data) {
                const updatedTag = await Tag.findByIdAndUpdate(
                    { _id: tag._id },
                    { $pull: { events: id } },
                    { new: true }
                );
                if (updatedTag.events.length === 0) {
                    await Tag.findByIdAndDelete(updatedTag._id);
                }
            }
        });

        res.status(StatusCodes.OK).json({ msg: "Deleted Event" });
    } catch (error) {
        next(error);
    }
};

const getTags = async (req, res, next) => {
    try {
        const tags = await Tag.find({}).select({ name: 1, _id: 1 });
        res.status(StatusCodes.OK).json({ msg: "tags", data: tags });
    } catch (error) {
        next(error);
    }
};

const addTags = async (event) => {
    let tags = event.Tags;
    const id = event._id;
    for (let tag of tags) {
        await Tag.findOne({ name: tag }, async (err, data) => {
            if (err) {
                throw new Error("error while adding tags");
            }
            if (data) {
                data.events.push(id);
                data.save();
            }
            if (!data) {
                await Tag.create({ name: tag, events: id });
            }
        }).clone();
    }
};

const filterEvents = async (req, res, next) => {
    try {
        const { StartDate, EndDate, EventRegion, EventType, Tags } = req.body;
        const queryObj = {};
        if (StartDate && StartDate !== "") {
            queryObj["StartDate"] = { $gte: StartDate };
        }
        if (EndDate && EndDate !== "") {
            queryObj["EndDate"] = { $lte: EndDate };
        }
        if (EventRegion && EventRegion !== "") {
            queryObj["EventRegion"] = EventRegion;
        }
        if (EventType && EventType !== "" && EventType.length) {
            queryObj["EventType"] = EventType;
        }
        Event.find(queryObj).exec((err, data) => {
            if (err) {
                throw new Error(err);
            }
            let events = data;
            if (Tags.length) {
                events = data.filter((event) => {
                    return event.Tags.some((tag) => {
                        tag = tag.trim().toLowerCase();
                        return Tags.includes(tag);
                    });
                });
            }
            res.status(200).json({ data: events });
        });
    } catch (error) {
        next(error);
    }
};

const bookATicket = async (req, res, next) => {
    try {
        const { id: eventId } = req.params;
        const event = await Event.findByIdAndUpdate(
            { _id: eventId },
            { $push: { Bookings: [req.user._id] } },
            { new: true }
        );
        const user = await User.findByIdAndUpdate(
            { _id: req.user._id },
            { $push: { tickets: [event._id] } },
            { new: true }
        );
        res.status(200).json({ msg: "Booking Successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEvent,
    getAllEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    filterEvents,
    getTags,
    bookATicket,
};
