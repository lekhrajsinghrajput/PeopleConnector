const express = require("express");
const route = express.Router();

//@route    GET /api/profile/test
//@desc     test route
//@access   Public

route.get("/test", (req, res) => {
  res.json({ msg: "user profile" });
});

module.exports = route;
