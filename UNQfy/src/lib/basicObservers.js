const Pair = require('./pair');
const Logging = require('../models/observer/logging');
const Newsletter = require('../models/observer/newsletter');
const Action = require('../models/observer/action');

const loggingObserver = new Pair(new Logging(), Object.keys(Action));
const newsletterObserver = new Pair(new Newsletter(), [Action.addAlbum, Action.deleteArtist]);

const basicObservers = [loggingObserver, newsletterObserver];

module.exports = basicObservers;