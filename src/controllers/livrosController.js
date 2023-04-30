import livros from "../models/Livro.js";

export class LivroController {

  static listarLivros = async (req, res) => {

    try {
      const livroResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livroResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }

  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).send(livroResultado);
    } catch (error) {
      res.status(400).send({ message: `Livro não encontrado pelo ID: ${id}` });
    }

  };

  static cadastrarLivro = async (req, res) => {
    let livro = new livros(req.body);

    try {
      const livroResultado = await livro.save();
      res.status(200).send(livroResultado.toJSON());
    } catch (error) {
      res.status(500).send({ message: "falha ao cadastrar livro." });
    }

  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: `Livro ${id} atualizado com sucesso.` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "livro removido" });
    } catch (error) {
      res.status(500).send({ message: `${error.message} - Livro não deletado` });
    }

  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;

    try {
      const livroResultado = await livros.find({ "editora": editora }, {});
      res.status(200).send(livroResultado);
    } catch (error) {
      res.status(400).send({ message: `Livro não encontrado pela Editora: ${editora}` });
    }

  };
}
