const produtos = require("../bancodedados/produtos");
const { getStateFromZipcode } = require("utils-playground");

async function encontreOProduto(idProduto) {
  return produtos.filter((produto) => {
    return produto.id === Number(idProduto);
  });
}

async function calculeOFrete(cep, valorDoProduto) {
  try {
    const estadoDoCep = await getStateFromZipcode(String(cep));
    if (
      estadoDoCep === "BA" ||
      estadoDoCep === "SE" ||
      estadoDoCep === "AL" ||
      estadoDoCep === "PE" ||
      estadoDoCep === "PB"
    ) {
      return (valorDoProduto * 10) / 100;
    } else if (estadoDoCep === "SP" || estadoDoCep === "RJ") {
      return (valorDoProduto * 15) / 100;
    } else {
      return (valorDoProduto * 12) / 100;
    }
  } catch (err) {
    return "Não foi possível calcular o frete.";
  }
}

async function listarProdutos(req, res) {
  try {
    const response = await produtos;
    return res.json(response);
  } catch (error) {
    return res.status(500).json("Erro no servidor");
  }
}

async function detalharProdutos(req, res) {
  const { idProduto } = req.params;

  try {
    const produtoDetalhado = await encontreOProduto(idProduto);
    return res.json(produtoDetalhado);
  } catch (error) {
    return res.status(500).json("Erro no servidor");
  }
}

async function calcularFrete(req, res) {
  const { idProduto, cep } = req.params;

  try {
    const produtoDetalhado = await encontreOProduto(idProduto);
    const estadoDoCep = await getStateFromZipcode(String(cep));
    const valor = produtoDetalhado[0].valor;
    const freteCalculado = await calculeOFrete(cep, valor);

    const freteDoProduto = {
      produto: {
        id: produtoDetalhado[0].id,
        nome: produtoDetalhado[0].nome,
        valor: produtoDetalhado[0].valor,
      },
      estado: estadoDoCep,
      frete: freteCalculado,
    };
    res.json(freteDoProduto);
  } catch (error) {
    return res.status(500).json('Erro no servidor')
  }
}

module.exports = {
  listarProdutos,
  detalharProdutos,
  calcularFrete,
};
