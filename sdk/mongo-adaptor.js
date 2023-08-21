var db = require('../api/V1/model/');

function GetDocument(model, query, projection, extension, callback) {
    var query = db[model].find(query, projection, extension.options);
    if (extension.populate) {
        if (Array.isArray(extension.populate)) {
            extension.populate.forEach(item => {
                query.populate(item);
            });
        } else {
            query.populate(extension.populate);
        }
    }
    if (extension.sort) {
        query.sort(extension.sort);
    }

    if(extension.skip){
        query.skip(extension.skip);
    }

    if(extension.limit){
        query.limit(extension.limit);
    }
    query.lean().exec(function (err, docs) {
        if (extension.count) {
            query.count(function (err, docs) {
                callback(err, docs);
            });
        } else {
            callback(err, docs);
        }
    });
}

function GetOneDocument(model, query, projection, extension, callback) {
    var query = db[model].findOne(query, projection, extension.options);
    if (extension.populate) {
        if (Array.isArray(extension.populate)) {
            extension.populate.forEach(item => {
                query.populate(item);
            });
        } else {
            query.populate(extension.populate);
        }
    }
    if(extension.skip){
        query.skip(extension.skip);
    }

    if(extension.limit){
        query.limit(extension.limit);
    }
    if (extension.sort) {
        query.sort(extension.sort);
    }
    query.exec(function (err, docs) {
        callback(err, docs);
    });
}

function GetAggregation(model, query, callback) {
    db[model].aggregate(query ).allowDiskUse(true).exec(function (err, docs) {
        callback(err, docs);
    });
}

function GetAggregationMultiple(model1,model2,query,callback){
    db[model1].aggregate(query ).allowDiskUse(true).exec(function (err, docs) {
        docs=docs && docs.length>0 ? docs :[];
        db[model2].aggregate(query ).allowDiskUse(true).exec(function (err1, docs1) {
            docs1=docs1 && docs1.length>0 ? docs1 :[];
            docs.push(...docs1);
            callback(err, docs);
        });

    });
}

function InsertDocument(model, docs, callback) {
    var doc_obj = new db[model](docs);
    doc_obj.save(function (err, numAffected) {
        callback(err, numAffected);
    })
}

function InsertManyDocument(model, docs, callback) {
    var doc_obj = new db[model](docs);
    db[model].insertMany( docs, (err , res)=>{
        callback(err, res);

    } )
}

function DeleteDocument(model, criteria, callback) {
    db[model].remove(criteria, function (err, docs) {
        callback(err, docs);
    });
}

function UpdateDocument(model, criteria, doc, options, callback) {
    db[model].update(criteria, doc, options, function (err, docs) {
        callback(err, docs);
    });
}

function GetCount(model, conditions, callback) {
    db[model].count(conditions, function (err, count) {
        callback(err, count);
    });
}

function GetCountMultiple(model1,model2, conditions, callback) {
    db[model1].count(conditions, function (err, count) {
        db[model2].count(conditions, function (err1, count1) {
            count=count+count1;
            callback(err, count);
        });
    });
}


function PopulateDocument(model, docs, options, callback) {
    db[model].populate(docs, options, function (err, docs) {
        callback(err, docs);
    });
}

function RemoveDocument(model, criteria, callback) {
    db[model].remove(criteria, function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {
    "GetDocument": GetDocument,
    "GetOneDocument": GetOneDocument,
    "InsertDocument": InsertDocument,
    "DeleteDocument": DeleteDocument,
    "UpdateDocument": UpdateDocument,
    "GetAggregation": GetAggregation,
    "PopulateDocument": PopulateDocument,
    "RemoveDocument": RemoveDocument,
    "GetCount": GetCount,
    InsertManyDocument : InsertManyDocument,
    "GetAggregationMultiple":GetAggregationMultiple,
    "GetCountMultiple":GetCountMultiple
};
