import express from "express";

const app = express();

app.use(express.json())

const livors = [
    {id: 1, "titulo": "Senhor dos Aneis"},
    {id: 2, "titulo": "O Hobbit"}
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

app.get('/livros', (req, res) => {
    res.status(200).json(livors);
})

app.post('/livros', (req, res) => {
    livors.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso!');
})

export default app