import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

export class AutorController {

  static listarAutores = async (req, res, next) => {

    try {

      const autorResultado = autores.find();

      req.resultado = autorResultado;

      next();

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
        next(new NaoEncontrado("ID do Autor não localizado"));
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
      next(new NaoEncontrado("ID do Autor não localizado"));
    }

  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido" });

    } catch (error) {
      next(new NaoEncontrado("ID do Autor não localizado"));
    }

  };
}
