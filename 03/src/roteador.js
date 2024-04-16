const express = require('express')
const rotas = express()
const { busqueOEndereco } = require('../src/controladores/buscarEnderecos') 

rotas.get('/enderecos/:cep', busqueOEndereco)

module.exports = rotas