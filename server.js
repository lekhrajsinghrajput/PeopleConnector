const express = require("express");
const mongoose = require("mongoose");
const dbUrl = require("./config/database").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to db
mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log("db connection established"))
  .catch(err => console.log(`error while connecting to db ${err}`));

app.get("/", (req, res) => {
  res.send("hello");
});

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
