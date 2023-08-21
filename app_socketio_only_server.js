//"use strict";

var REDIS_HOST = process.env.REDIS_HOST || "localhost";
var REDIS_PORT = process.env.REDIS_PORT || 6379;

/** Dependency Injection */
var mongoose = require("mongoose"), // $ npm install mongoose
    CONFIG = require("./config/config"), // Injecting Our Configuration
    i18n = require("i18n");
/** /Dependency Injection */

/** Socket.IO */

const express = require('express');
const http = require('http');

const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var redisAdapter = require("socket.io-redis");
io.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));
io.sockets.setMaxListeners(100);
/** /Socket.IO */

/** Global Configuration**/
global.GLOBAL_CONFIG = CONFIG.GLOBAL;
mongoose.Promise = global.Promise;

/** Middleware Configuration */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
i18n.configure({
        locales: ["fr", "en"],
        defaultLocale: "en",
        autoReload: true,
        directory: __dirname + "/uploads/languages",
        syncFiles: true,
        objectNotation: true,
        updateFiles: false
    }
);




/** /Middleware Configuration */
/*
mongoose.connect(CONFIG.DB_URL, function (error) {
    if (error) {
        console.log('MongoDB connection error: ', error);
    }
}); //Connecting with MongoDB
*/

/** MongoDB Connection */
mongoose.connect(CONFIG.DB_URL);
mongoose.connection.on("error", function(error) {
    console.error("Error in MongoDb connection: " + error);
});
mongoose.connection.on("connected", function() {
    console.log("Good day!");
});
mongoose.connection.on("reconnected", function() {
    console.log("MongoDB reconnected!");
});
mongoose.connection.on("disconnected", function() {
    console.log("MongoDB disconnected!");
});
app.get('/', (req, res) => res.send('OK'));
app.get('/sys-health', (req, res) => res.send('OK'));
require(".system/sockets")(io);


/** HTTP Server Instance */
try {
    server.listen(CONFIG.PORT, function() {
        console.log(
            "Server turned on with",
            CONFIG.ENV,
            "mode on port",
            CONFIG.PORT
        );
    });
} catch (ex) {
    console.log(ex);
}
/** /HTTP Server Instance */
