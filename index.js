const express = require('express');
const { prototype } = require('mocha');

const app = express();

let PORT = process.env.PORT || 3011;

app.get('/', function(req, res) {
    res.send('Settings Bill App');
});

app.post('/settings', function(req, res) {

});

app.post('/action', function(req, res) {

});

app.get('/actions', function(req, res) {

});

app.listen(PORT, function() {
    console.log('Listening on port', PORT);
});