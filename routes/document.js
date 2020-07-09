var express = require('express');
var app = express();


var documentClient = require("documentdb").DocumentClient;
const uriFactory = require('documentdb').UriFactory;
var config = require("../config.js");


var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseId = config.database.id;
var collectionId = config.collection.id;

var objectResult = null;


//Rutas
app.post('/', (request, resp, next) => {

    getOperationDb(result => {

        console.log(result);

        var resultado = objectResult;

        resp.status(200).json({
            mensaje: 'peticion correcta',
            ok: true,
            resultado: objectResult
        });
    });


    ///get collection document db 
    let collectionUrl = uriFactory.createDocumentCollectionUri(databaseId, collectionId);
    return new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl,
            'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"'
        ).toArray((err, results) => {
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    if (queryResult === undefined) { return; }
                    let resultString = JSON.stringify(queryResult);

                    queryResult.forEach(element => {
                        console.log(element);
                        resp.status(200).json({
                            mensaje: 'peticion correcta',
                            ok: true,
                            resultado: element
                        });

                    });
                    // console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
            }
        });
    });




});

function getOperationDb() {
    return getDatabase()
        .then(() => getCollection())
        .then(() => getFamilyDocument(config.documents.Andersen))
        .then(() => queryCollection(result => {
            console.log(result);

        }))
        .then(() => cleanup())
        .then(() => { exit(`Completed successfully`); })
        .catch((error) => { exit(`Completed with error ${JSON.stringify(error)}`) });





    // queryCollection(result => {
    //     console.log(result);
    // })
}


/**
 * Get the database by ID, or create if it doesn't exist.
 * @param {string} database - The database to get or create
 */
function getDatabase() {
    console.log(`Getting database:\n${databaseId}\n`);
    let databaseUrl = uriFactory.createDatabaseUri(databaseId);
    return new Promise((resolve, reject) => {
        client.readDatabase(databaseUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDatabase({ id: databaseId }, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Get the collection by ID, or create if it doesn't exist.
 */
function getCollection() {
    console.log(`Getting collection:\n${collectionId}\n`);
    let collectionUrl = uriFactory.createDocumentCollectionUri(databaseId, collectionId);
    return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    let databaseUrl = uriFactory.createDatabaseUri(databaseId);
                    client.createCollection(databaseUrl, { id: collectionId }, { offerThroughput: 400 }, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
}


/**
 * Get the document by ID, or create if it doesn't exist.
 * @param {function} callback - The callback function on completion
 */
function getFamilyDocument(document) {
    if (document === undefined) {
        return;
    }
    console.log(`Getting document:\n${document.id}\n`);
    let documentUrl = uriFactory.createDocumentUri(databaseId, collectionId, document.id);
    return new Promise((resolve, reject) => {
        client.readDocument(documentUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    let collectionUrl = uriFactory.createDocumentCollectionUri(databaseId, collectionId);
                    client.createDocument(collectionUrl, document, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
};



/**
 * Query the collection using SQL
 */
function queryCollection() {
    console.log(`Querying collection through index:\n${collectionId}`);
    let collectionUrl = uriFactory.createDocumentCollectionUri(databaseId, collectionId);
    return new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl,
            'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"'
        ).toArray((err, results) => {
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    if (queryResult === undefined) { return; }
                    let resultString = JSON.stringify(queryResult);

                    queryResult.forEach(element => {
                        console.log(element);
                        objectResult = element;

                    });
                    // console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
            }
        });
    });
};

/**
 * Replace the document by ID.
 */
function replaceFamilyDocument(document) {
    console.log(`Replacing document:\n${document.id}\n`);
    let documentUrl = uriFactory.createDocumentUri(databaseId, collectionId, document.id);
    document.children[0].grade = 6;
    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, document, (err, result) => {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
};



/**
 * Delete the document by ID.
 */
function deleteFamilyDocument(document) {
    console.log(`Deleting document:\n${document.id}\n`);
    let documentUrl = uriFactory.createDocumentUri(databaseId, collectionId, document.id);
    return new Promise((resolve, reject) => {
        client.deleteDocument(documentUrl, (err, result) => {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
};

/**
 * Cleanup the database and collection on completion
 */
function cleanup() {
    console.log(`Cleaning up by deleting database ${databaseId}`);
    let databaseUrl = uriFactory.createDatabaseUri(databaseId);
    return new Promise((resolve, reject) => {
        client.deleteDatabase(databaseUrl, (err) => {
            if (err) reject(err)
            else resolve(null);
        });
    });
}

/**
 * Exit the app with a prompt
 * @param {message} message - The message to display
 */
function exit(message) {
    console.log(message);
    console.log('Press any key to exit');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}

module.exports = app