// Requires
var express = require('express');
var bodyParser = require('body-parser');

//Inicializar variables
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTION, DELETE");
    next();
});


var username = 'mongodbtesting'
const encodedPassword = encodeURIComponent("8LfeykydeI0OYggZQROfdeDOfsKOaiRHnt2y8ZCJMGyFMbxWzHxhLGOYEdr38mQOWktPwcLWWhg0YL11mxKZDQ==");
var host = 'mongodbtesting.documents.azure.com';
var urlServer = `mongodb://${username}:${encodedPassword}@${host}:10255/?ssl=true`;

//conexion a la base de datos
mongoose.connection.openUri(urlServer, (err, resp) => {
    if (err) {
        throw err;
    }
    console.log('conectado ala base de datos mongo: \x1b[32m%s\x1b[0m', 'online');
});



//body parser config
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var appRoutes = require('./routes/app');
var storageRoutes = require('./routes/storage.js');
var cosmoRoutes = require('./routes/cosmodb.js');
var documentRoutes = require('./routes/document.js');
var mongodbRoutes = require('./routes/mongodb.js');






app.use('/', appRoutes);
app.use('/storage', storageRoutes);
app.use('/cosmos', cosmoRoutes);
app.use('/document', documentRoutes);
app.use('/mongo', mongodbRoutes);


//Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});