const http = require('http');
const rootApp = require('./src/api/api');

const port = 7071;

const server = http.createServer(rootApp);

server.listen(port, () => console.log(`Logging listen on port ${port}`));