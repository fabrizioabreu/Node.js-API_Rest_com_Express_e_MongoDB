import autores from "../models/Autor.js";

export class AutorController {

  static listarAutores = async (req, res, next) => {

    try {
      const autorResultado = await autores.find();
      res.status(200).json(autorResultado);
    } catch (err) {
      next(err);
    }

  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: `Autor não encontrado pelo ID: ${id}` });
      }
    } catch (error) {
      next(error);
    }

  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores(req.body);

    try {
      const autorResultado = await autor.save();
      res.status(200).send(autorResultado.toJSON());

    } catch (error) {
      next(error);
    }

  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: `Autor ${id} atualizado com sucesso.` });
    } catch (error) {
      next(error);
    }

  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido" });

    } catch (error) {
      next(error);
    }

  };
}
