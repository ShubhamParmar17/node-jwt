const router = require("express").Router();
const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  res.send("Welcome");
});

module.exports = router;
