const router = require("express").Router();
const {
    addEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    filterEvents,
    bookATicket,
} = require("../controllers/events");
const auth = require("../middlewares/auth");

router.post("/", auth, addEvent);
router.get("/", getAllEvents);
router.route("/search/").post(filterEvents);
router.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);
router.post("/:id/ticket/", auth, bookATicket);

module.exports = router;
