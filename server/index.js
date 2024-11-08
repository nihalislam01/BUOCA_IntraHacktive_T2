const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const errorMiddleware = require("./middleware/error");

const user = require("./routes/userRoute");
const event = require("./routes/eventRoute");
const room = require("./routes/roomRoute");
const budget = require("./routes/budgetRoute");
const notification = require("./routes/notificationRoute");
const message = require("./routes/messageRoute");


if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/event", event);
app.use("/api/room", room);
app.use("/api/budget", budget);
app.use("/api/notification", notification);
app.use("/api/message", message);

app.use(errorMiddleware);

module.exports = app;
