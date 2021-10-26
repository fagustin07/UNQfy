const express = require('express');
const router = express.Router();
const { ResourceNotFound } = require('../../errors/basics');



router.route('*')
    .get((_, __) => {
        throw new ResourceNotFound('Resource');
    })
    .post((_, __) => {
        throw new ResourceNotFound('Resource');
    })
    .delete((_, __) => {
        throw new ResourceNotFound('Resource');
    })
    .patch((_, __) => {
        throw new ResourceNotFound('Resource');
    });

module.exports = router;