const express = require("express");
const router = express.Router();
const {
  monthlyCollectionReport,
  dueStudentsReport,
} = require("../controllers/report.controller");

router.get("/monthly", monthlyCollectionReport);
router.get("/dues", dueStudentsReport);

module.exports = router;
