var express = require('express');
var app = express();

const storage = require('azure-storage');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=dbcosmic;AccountKey=ZLa8b9mfNwFCdNLpp6ed6LTG52UCRkJlYTqXVgF4F2VHqs5ExuAfInKzxiAXz1cnyn8mxIuRbXoqRjmc6OCuNA==;TableEndpoint=https://dbcosmic.table.cosmos.azure.com:443/;";



var entityResolver = function(entity) {
    var resolvedEntity = {};

    for (key in entity) {
        resolvedEntity[key] = entity[key]._;
    }
    return resolvedEntity;
}

//Rutas
app.post('/', (req, resp, next) => {

    var body = req.body;
    var tablename = body.table;
    var partitionKey = body.key;

    var options = {};
    options.entityResolver = entityResolver;

    const storageClient = storage.createTableService(connectionString);


    storageClient.retrieveEntity(tablename, partitionKey, '1', options, function(error, result, response) {

        if (!error) {
            console.log('result: ', result);
            //desestructruracion
            const { Edad, Nombre, Sueldo, PartitionKey } = result;
            //variable literal
            const respuestaFormat = {
                Edad,
                Nombre,
                Sueldo
            }

            resp.status(200).json({
                mensaje: 'peticion correcta',
                ok: true,
                respuesta: respuestaFormat
            });
        }
    });

});

module.exports = app