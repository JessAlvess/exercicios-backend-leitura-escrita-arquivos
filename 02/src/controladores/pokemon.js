const { listarPokemons, detalharPokemon } = require('utils-playground')

async function listeOsPokemons(req, res) {
    const { paginaDaLista } = req.query
    let listaDePokemons
    if (paginaDaLista) {
        listaDePokemons = await listarPokemons(paginaDaLista)
    } else {
        listaDePokemons = await listarPokemons()
    }

    return res.send(listaDePokemons.results)
}

async function detalheOPokemon(req, res) {
    const { pokemon } = req.params
    let pokemonDetalhado
    if (pokemon) {
        pokemonDetalhado = await detalharPokemon(pokemon)
    } else {
        pokemonDetalhado = await detalharPokemon()
    }

    const objetoPokemon = {
        "id": pokemonDetalhado.id,
        "name": pokemonDetalhado.name,
        "height": pokemonDetalhado.height,
        "weight": pokemonDetalhado.weight,
        "base_experience": pokemonDetalhado.base_experience,
        "forms": pokemonDetalhado.forms,
        "abilities": pokemonDetalhado.abilities,
        "species": pokemonDetalhado.species
    }

    return res.send(objetoPokemon)
}

module.exports = {
    listeOsPokemons,
    detalheOPokemon
}