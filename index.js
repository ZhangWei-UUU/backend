const express = require('express');
const app = express();
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const ws = require("./router/ws");
const order = require("./router/order");
const customer = require("./router/customer");

const DB_CONFIG = require("./db");

const authentication = require('./router/authentication');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use('/authentication',authentication);
app.use('/ws',ws);
app.use('/order',order);
app.use('/customer',customer);

app.listen(3010, () => console.log('Now node.js instance is running, listening on port 3010!'))