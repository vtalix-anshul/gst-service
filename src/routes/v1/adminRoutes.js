const express = require("express");
const { updateGst, deleteGstRecord, getGstByDoctor } = require("../../controllers/v1/gstController");
const router = express.Router();

router.put("/update-gst/:id", updateGst);
router.delete("/delete-gst/:id", deleteGstRecord);
router.get("/:id", getGstByDoctor);

module.exports = router;