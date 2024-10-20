const express = require("express");
const router = express.Router();
const { testdata } = require("../controllers/test");
router.post("/test", testdata);
module.exports = router;
