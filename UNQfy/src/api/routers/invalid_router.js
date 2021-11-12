const express = require('express');
const router = express.Router();
const { ResourceNotFound } = require('../../errors/api_errors');

router.route('*')
    .get((_, __) => {
        throw new ResourceNotFound();
    })
    .post((_, __) => {
        throw new ResourceNotFound();
    })
    .delete((_, __) => {
        throw new ResourceNotFound();
    })
    .patch((_, __) => {
        throw new ResourceNotFound();
    });

module.exports = router;