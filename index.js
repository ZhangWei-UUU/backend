const express = require('express')
const app = express()

app.get("/", (req, res) => res.send({name:"zhangwei"}))

app.listen(3010, () => console.log('Example app listening on port 3010!'))