import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

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
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livroResultado = await livros
          .find(busca)
          .populate("autor");

        res.status(200).send(livroResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }

  };
}

async function processaBusca(parametros) {

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  // https://www.mongodb.com/docs/manual/reference/operator/query/
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // let = Less Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}