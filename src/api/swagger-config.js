const options = {
  swaggerDefinition: {
    info: {
      title: 'UNQfy',
      version: '1.0',
      description: 'UNQfy API REST with Swagger doc',
    },
    schemes: ['http'],
    host: 'localhost:8081',
    basePath: '/api',
  },
  apis: ['./src/api/routers/album_router.js', './src/api/routers/artist_router.js',
  './src/api/routers/playlist_router.js', './src/api/routers/track_router.js', './src/api/routers/user_router.js'],
};

module.exports = {
  options
};