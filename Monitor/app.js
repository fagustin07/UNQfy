const http = require('http');
require('dotenv').config();
const rootApp = require('./src/api/api');

const port = 7100;

const server = http.createServer(rootApp);

server.listen(port, () => console.log(`Monitor listen on port ${port}`))