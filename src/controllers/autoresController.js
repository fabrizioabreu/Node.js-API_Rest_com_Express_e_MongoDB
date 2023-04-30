import mongoose from "mongoose";
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

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: `Autor não encontrado pelo ID: ${id}` });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno de servidor." });
      }
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
