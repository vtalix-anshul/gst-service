const express = require("express");
const {
    createGst,
    getGstByDoctor
} = require("../../controllers/v1/gstController");
const router = express.Router();

router.post("/create-gst", createGst);
router.get("/:id", getGstByDoctor)

module.exports = router;