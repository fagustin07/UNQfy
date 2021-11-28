const axios = require('axios');
const { BadRequest } = require('../model/errors');

function verify_artist_id(req, res, next) {
  if (requireArtistId(req)) {
    const artistId = Number.isSafeInteger(req.body.artistId) ? req.body.artistId : req.query.artistId;
    if (!artistId) throw new BadRequest();

    axios.get(process.env.UNQFY_API_HOST + `/api/artists/${artistId}`)
      .then(() => {
        next();
      })
      .catch((err) => {
        const response = err.response;
        res.status(response ? response.data.status : 503)
          .json({
            status: response ? response.data.status : 503,
            errorCode: response ? response.data.errorCode : 'SERVICE_UNAVAILABLE'
          });
      });
  } else {
    next();
  }
}

const requireArtistId = (req) => {
  const { path, method } = req;

  return (path === '/api/subscribe' && method === 'POST') ||
    (path === '/api/unsubscribe' && method === 'POST') ||
    (path === '/api/subscriptions' && method === 'GET') ||
    (path === '/api/notify' && method === 'POST');
}

module.exports = verify_artist_id;