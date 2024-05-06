const express = require("express");
const { generateShortURL, getAllShortURL } = require("../controllers/url");
const router = express.Router();

router.post('/',generateShortURL);
router.get('/get-all',getAllShortURL);

module.exports = router;