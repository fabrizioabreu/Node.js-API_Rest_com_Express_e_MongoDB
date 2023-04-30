import livros from "../models/Livro.js";

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

      res.status(200).send(livroResultado);
    } catch (error) {
      next(error);
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
      next(error);
    }

  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "livro removido" });
    } catch (error) {
      next(error);
    }

  };

  static listarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;

    try {
      const livroResultado = await livros.find({ "editora": editora }, {});
      res.status(200).send(livroResultado);
    } catch (error) {
      next(error);
    }

  };
}
