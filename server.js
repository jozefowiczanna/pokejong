const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
// const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// app.use(passport.initialize());
// require("./config/passport")(passport);

app.use(morgan("tiny"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use("*", function (request, response) {
    response.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
