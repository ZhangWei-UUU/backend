const express = require('express')
const app = express()
const ws = require("./router/ws");

app.use('/ws',ws);
app.get("/", (req, res) => res.send({name:"zhangwei"}))
app.get("/test2", (req, res) => res.send({name:"zhangwei2"}))

app.listen(3010, () => console.log('Example app listening on port 3010!'))