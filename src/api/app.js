const express  = require('express'); 
const bodyParser = require('body-parser');
const artists_router = require('./routers/artist_router.js');
const app = express();
const port = 9000;  

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', artists_router);

app.listen(port, () => {
    console.log("Server running");
});

console.log("Listening in the port %d...", port);