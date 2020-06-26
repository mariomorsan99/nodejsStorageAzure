var express = require('express');
var app = express();
var connectionString = 'DefaultEndpointsProtocol=https;AccountName=conteinerstore;AccountKey=okPj0z4TfnXdLDOw5cMs5+OF69DB2WSM0Y4SRtZ/BGh/u+T6uDunKZb9PcyR8atjumUi8vTWiaI9r8AjNO9u7A==;EndpointSuffix=core.windows.net';

var azure = require('azure-storage');
var tableSvc = azure.createTableService(connectionString);

var entGen = azure.TableUtilities.entityGenerator;
var task = {
    PartitionKey: entGen.String('hometasks'),
    RowKey: entGen.String('1'),
    email: entGen.String('mariomorsan99gmail.com'),
    usuario: entGen.String('mariomorsan'),
    dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
};

var query = new azure.TableQuery()
    .top(5)
    .where('PartitionKey eq ?', 'CONDITION');


var entityResolver = function(entity) {
    var resolvedEntity = {};

    for (key in entity) {
        resolvedEntity[key] = entity[key]._;
    }
    return resolvedEntity;
}

app.post('/', (req, resp) => {

    var body = req.body;
    var tablename = body.table;
    var partitionKey = body.key;

    var options = {};
    options.entityResolver = entityResolver;

    tableSvc.retrieveEntity(tablename, partitionKey, '1', options, function(error, result, response) {

        if (!error) {
            console.log('result: ', result);
            //desestructruracion
            const { email, usuario } = result;
            //variable literal
            const respuestaFormat = {
                email,
                usuario
            }

            resp.status(200).json({
                mensaje: 'peticion correcta',
                ok: true,
                respuesta: respuestaFormat
            });
        }
    });


});



module.exports = app;