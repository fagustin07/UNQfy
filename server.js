const http = require('http');
const rootApp = require('./src/api/app');

const port = 8081;

server = http.createServer(rootApp);

server.listen(port, () => console.log(`Listening on port ${port}`))