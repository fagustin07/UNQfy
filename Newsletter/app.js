const http = require('http');
const rootApp = require('./src/api/api');

const port = 7072;

const server = http.createServer(rootApp);

server.listen(port, () => console.log(`Newsletter listen on port ${port}`));