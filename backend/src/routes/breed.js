const express = require("express");

const BreedApi = require("../api/breed");
const router = express.Router();

router.post("/", BreedApi.createBreed);

module.exports = router;