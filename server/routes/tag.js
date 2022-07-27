const router = require("express").Router();

const { getTags } = require("../controllers/events");

router.get("/", getTags);
module.exports = router;
