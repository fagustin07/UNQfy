const axios = require('axios');
const { BadRequest } = require('../model/errors');

function verif_artist_id(req, res, next) {
  const artistId = req.body.artistId ? req.body.artistId : req.query.artistId;

  if (!artistId) throw new BadRequest();

  axios.get(`http://localhost:7000/api/artists/${artistId}`)
    .then((_) => {
      next();
      console.log("[--Artista Verificado--]");
    })
    .catch((err) => {
      const response = err.response;
      res.status(response.data.status)
        .json({ status: response.data.status, errorCode: response.data.errorCode });
    });
}

module.exports = verif_artist_id;