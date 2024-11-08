const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');

const errorMiddleware = require("./middleware/error");

const user = require("./routes/userRoute");
const event = require("./routes/eventRoute");
const club = require("./routes/clubRoute");
const budget = require("./routes/budgetRoute");
const notification = require("./routes/notificationRoute");


if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const corsOptions = {
  origin: process.env.CLIENT_DOMAIN, 
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/event", event);
app.use("/api/club", club);
app.use("/api/budget", budget);
app.use("/api/notification", notification);

app.use(errorMiddleware);

module.exports = app;
