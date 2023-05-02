import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {

  try {

    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {

      // http://localhost:3000/livros/busca?editora=Alura&ordenacao=titulo:1&pagina=2
      // http://localhost:3000/autores?ordenacao=nome:1
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: [ordem] })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      res.status(200).json(resultadoPaginado);

    } else {
      next(new RequisicaoIncorreta());
    }

  } catch (error) {
    next(error);
  }
}

export default paginar;