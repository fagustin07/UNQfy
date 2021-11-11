const express = require('express');
const { BadRequest, LogginDesacitivated, CannotChangeStateOfLoggin } = require('./service/errors');
const error_handler = require('./service/error_handler');

const app = express();
const { logginService } = require('./service/loggin_service.js');

const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', router);
app.use(error_handler);

router.post('/activate', (_, res) => {
    if (logginService.isActive()) throw new CannotChangeStateOfLoggin('activated');

    logginService.activate();

    res.status(200)
        .json({ statusCode: 200, message: 'Activated' });
});

router.post('/desactivate', (_, res) => {
    if (!logginService.isActive()) throw new CannotChangeStateOfLoggin('desactivated');

    logginService.desactivate();

    res.status(200)
        .json({ statusCode: 200, message: 'Desactivated' });
});

router.post('/log', (req, res) => {
    const { message, level } = req.body;

    if (!message || !level) throw new BadRequest();

    if (logginService.isActive()) {
        logginService.log(message, level);
        res.status(200)
            .json({ statusCode: 200, message: 'Logged' });

    } else {
        throw new LogginDesacitivated();
    }


});

module.exports = app;