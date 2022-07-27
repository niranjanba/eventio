const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        EventName: {
            type: String,
            required: [true, "Please Enter Event Name"],
            lowercase: true,
        },
        StartDate: {
            type: Date,
            required: [true, "Please select start date"],
        },
        EndDate: {
            type: Date,
            required: [true, "Please select end date"],
        },
        StartTime: {
            type: String,
            required: [true, "Please select start time"],
        },
        EndTime: {
            type: String,
            required: [true, "Please select end time"],
        },
        EventType: {
            type: String,
            required: [true, "Please select event type"],
            lowercase: true,
        },
        EventRegion: {
            type: String,
            required: [true, "Please select event region"],
            lowercase: true,
        },
        By: {
            type: String,
            required: [true, "Please enter organized by"],
            lowercase: true,
        },
        CreatedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        Description: {
            type: String,
            required: [true, "Enter description"],
        },
        Location: {
            type: String,
            required: [true, "Enter location"],
        },
        // Tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
        Tags: [{ type: String, trim: true, lowercase: true }],
        Image: {
            type: String,
        },
        Bookings: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

const tagSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, lowercase: true },
        events: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
    },
    { minimize: false }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Tag, Event };
