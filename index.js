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

// var store = new MongoDBStore({
//     uri: `${DB_CONFIG.url}/session`,
//     collection: "sessions"
// });

// app.use(require("express-session")({
//   secret: "This is a secret",
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//   },
//   store: store,
//   resave: true,
//   saveUninitialized: true
// }));

app.use(cookieParser());
app.use('/authentication',authentication);
app.use('/ws',ws);
app.use('/order',order);
app.use('/customer',customer);
app.get("/", (req, res) => res.send({name:"zhangwei"}))
app.get("/test2", (req, res) => res.send({name:"zhangwei2"}))

app.listen(3010, () => console.log('Example app listening on port 3010!'))