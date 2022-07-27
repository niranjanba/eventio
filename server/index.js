require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const auth = require("./middlewares/auth");

// DB
const connectDB = require("./db/connect");

// Routes
const authRoute = require("./routes/auth");
const eventsRoute = require("./routes/events");
const dashboardRoute = require("./routes/dashboard");
const tagsRoute = require("./routes/tag");

app.use("/api/v1/event", eventsRoute);
app.use("/api/v1/tags", tagsRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", auth, dashboardRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
//Error handling
app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB()
        .then(() => console.log("SERVER IS UP AND RUNNING"))
        .catch((err) => console.log(err.message));
});
