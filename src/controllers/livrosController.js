import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

export class LivroController {

  static listarLivros = async (req, res, next) => {

    try {
      const livroResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livroResultado);
    } catch (error) {
      next(error);
    }

  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      console.log("livroResultado ", livroResultado);

      res.status(200).send(livroResultado);
    } catch (error) {
      next(new NaoEncontrado("ID do Livro não localizado"));
    }

  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);

    try {
      const livroResultado = await livro.save();
      res.status(200).send(livroResultado.toJSON());
    } catch (error) {
      next(error);
    }

  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: `Livro ${id} atualizado com sucesso.` });
    } catch (error) {
      next(new NaoEncontrado("ID do Livro não localizado"));
    }

  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "livro removido" });
    } catch (error) {
      next(new NaoEncontrado("ID do Livro não localizado"));
    }

  };

  static listarLivroPorFiltro = async (req, res, next) => {

    try {
      const busca = processaBusca(req.query);

      const livroResultado = await livros.find(busca);

      res.status(200).send(livroResultado);
    } catch (error) {
      next(error);
    }

  };
}

function processaBusca(parametros) {

  const { editora, titulo, minPaginas, maxPaginas } = parametros;

  // https://www.mongodb.com/docs/manual/reference/operator/query/
  // const regex = new RegExp(titulo, "i");  Exemplo 1
  const busca = {};

  if (editora) busca.editora = editora;
  // if (titulo) busca.titulo = regex; Exemplo 1
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // let = Less Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  return busca;
}