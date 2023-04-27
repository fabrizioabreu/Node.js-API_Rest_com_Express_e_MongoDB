import express from "express";

const app = express();

const livors = [
    {id: 1, "titulo": "Senhor dos Aneis"},
    {id: 1, "titulo": "O Hobbit"}
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

app.get('/livros', (req, res) => {
    res.status(200).json(livors);
})

export default app