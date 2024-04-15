const express = require('express')
const rotas = express()
const { listarProdutos, detalharProdutos, calcularFrete } = require('./controladores/produtos') 

rotas.get('/produtos', listarProdutos)
rotas.get('/produtos/:idProduto', detalharProdutos)
rotas.get('/produtos/:idProduto/frete/:cep', calcularFrete)


module.exports = rotas