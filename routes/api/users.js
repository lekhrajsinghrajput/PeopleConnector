const express = require("express");
const route = express.Router();

//@route    GET /api/users/test
//@desc     test route
//@access   Public

route.get("/test", (req, res) => {
  res.json({ msg: "user works" });
});

module.exports = route;
