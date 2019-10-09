const express = require("express");
const route = express.Router();

//@route    GET /api/posts/test
//@desc     test route
//@access   Public

route.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

module.exports = route;
