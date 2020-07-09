var config = {}

config.endpoint = "https://cosmosqldb.documents.azure.com:443/";
config.primaryKey = "iQbmyTN5YQ9EodCFeHKsaEZvGbEbAZ1SeRe47xvh8WxuMoib9Xk1KIqmWmlTyFPJOfMlqibGReiiExhWjyunYg==";

config.database = {
    "id": "FamilyDB"
};

config.collection = {
    "id": "FamilyColl"
};

config.documents = {
    "Andersen": {
        "id": "Anderson.1",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
            "firstName": "Mary Kay"
        }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    },
    "Andersen": {
        "id": "Anderson.2",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
            "firstName": "Mary Kay"
        }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    },
    "Andersen": {
        "id": "Anderson.3",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
            "firstName": "Mary Kay"
        }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    },
    "Andersen": {
        "id": "Anderson.4",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
            "firstName": "Mary Kay"
        }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    },
    "Andersen": {
        "id": "Anderson.5",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
            "firstName": "Mary Kay"
        }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    }

};

module.exports = config;