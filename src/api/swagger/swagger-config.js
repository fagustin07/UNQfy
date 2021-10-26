const options = {
  swaggerDefinition: {
    info: {
      title: 'UNQfy',
      version: '1.0',
      description: 'UNQfy API REST with Swagger doc. \n\nGithub: \n@nicolasmartinez0510 \n@fagustin07',
      contact: {
        name: 'Project repo',
        url: 'https://github.com/fagustin07/UNQfy',
      }
    },
    schemes: ['http'],
    host: 'localhost:8081',
    basePath: '/api',
  },
  apis: ['./src/api/swagger/docs/**.yaml', './src/api/swagger/docs/models/**.yaml']
};

module.exports = {
  options
};