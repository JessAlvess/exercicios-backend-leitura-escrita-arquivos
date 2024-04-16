const express = require('express')
const app = express()
app.use(express.json())
const rotas = require('./roteador')

app.use(rotas)

app.listen(3000)