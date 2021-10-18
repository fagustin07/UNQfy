const http = require('http');
const rootApp = require('./app');

const port = process.env.PORT || 8081;

server = http.createServer(rootApp);

server.listen(port, () => console.log(`Listening to port ${port}`))