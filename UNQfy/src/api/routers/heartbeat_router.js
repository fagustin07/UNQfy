const express = require('express');
const router = express.Router();

router.route('/')
    .get((_, res) => {
        res.status(200).send();
    })

module.exports = router;