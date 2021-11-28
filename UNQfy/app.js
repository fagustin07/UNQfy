const http = require('http');
const rootApp = require('./src/api/api');

const port = 7070;

const server = http.createServer(rootApp);

server.listen(port, () => console.log(`UNQfy listen on port ${port}`))