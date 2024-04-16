const { buscarEndereco } = require("utils-playground");
const fs = require("fs/promises");

async function encontrarEnderecoNoBancoDeDados(cep, array) {
  for (let index = 0; index < array.length; index++) {
    if (array[index].cep === cep) {
      return array[index];
    }
  }
}

async function padronizarCep(cep) {
  let cepArr = cep.split("");
  cepArr.splice(5, 0, "-");
  return String(cepArr.join(""));
}

async function busqueOEndereco(req, res) {
  const { cep } = req.params;
  try {
    let cepPadronizado = await padronizarCep(cep);

    if (!cepPadronizado) {
      return res.status(404).json("Digite o cep para encontrar o endereço");
    }

    const enderecos = await fs.readFile("./03/src/enderecos.json");

    const enderecosJson = JSON.parse(enderecos);

    let enderecoEncontrado = await encontrarEnderecoNoBancoDeDados(
      cepPadronizado,
      enderecosJson
    );

    if (!enderecoEncontrado) {
      enderecoEncontrado = await buscarEndereco(String(cep));
      enderecosJson.push(enderecoEncontrado);
      await fs.writeFile(
        "./03/src/enderecos.json",
        JSON.stringify(enderecoEncontrado)
      );
    }

    return res.json(enderecoEncontrado);
  } catch (error) {
    return res.status(500).json("Erro no servidor");
  }
}

module.exports = {
  busqueOEndereco,
};
