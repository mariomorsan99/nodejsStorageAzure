// Requires
var express = require('express');
var bodyParser = require('body-parser');

//Inicializar variables
var app = express();
var cors = require('cors');
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTION, DELETE");
    next();
});

//body parser config
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var appRoutes = require('./routes/app');
var storageRoutes = require('./routes/storage.js');

app.use('/', appRoutes);
app.use('/storage', storageRoutes);

//Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});