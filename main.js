const express = require('express');         // Express Web Server
const path = require('path');               // Used for manipulation with path

const app = express(); // Initialize the express web server
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')))
/**
 * Serve the basic index.html with upload form
 */
app.route('/').get((req, res) => {
    res.render('index');
});

const server = app.listen(3200, function () {
    console.log(`Listening on port ${server.address().port}`);
});
