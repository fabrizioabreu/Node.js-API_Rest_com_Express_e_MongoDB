import autores from "../models/Autor.js";

export class AutorController {

  static listarAutores = async (req, res) => {

    try {
      const autorResultado = await autores.find();
      res.status(200).json(autorResultado);
    } catch (err) {
      res.status(500).send({ message: `${err.message} Erro interno no servidor` });
    }

  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const autorResultado = await autores.findById(id);
      res.status(200).send(autorResultado);
    } catch (error) {
      res.status(400).send({ message: `Autor não encontrado pelo ID: ${id}` });
    }

  };

  static cadastrarAutor = async (req, res) => {
    let autor = new autores(req.body);

    try {
      const autorResultado = await autor.save();
      res.status(200).send(autorResultado.toJSON());

    } catch (error) {
      res.status(500).send({ message: "falha ao cadastrar autor." });
    }

  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: `Autor ${id} atualizado com sucesso.` });
    } catch (error) {
      res.status(500).send({ message: `ID: ${id}, não encontrado` });
    }

  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido" });

    } catch (error) {
      res.status(500).send({ message: `Autor não encontrado para o ID: ${id}` });
    }

  };
}
