const express = require('express')
const rotas = express()
const { listeOsPokemons, detalheOPokemon } = require('../src/controladores/pokemon') 

rotas.get('/pokemon', listeOsPokemons)
rotas.get('/pokemon/:pokemon', detalheOPokemon)

module.exports = rotas