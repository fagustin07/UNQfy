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
  apis: ['./src/api/swagger/docs/**.js'],
};

module.exports = {
  options
};