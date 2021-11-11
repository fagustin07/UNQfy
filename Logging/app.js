const http = require('http');
const rootApp = require('./loggin_api.js');

const port = 8082;

const server = http.createServer(rootApp);

server.listen(port, () => console.log(`Logging listening on port ${port}`));