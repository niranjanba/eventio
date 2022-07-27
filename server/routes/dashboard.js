const { dashboard, getTickets } = require("../controllers/dashboard");
const router = require("express").Router();

router.get("/events", dashboard);
router.get("/tickets/", getTickets);

module.exports = router;
