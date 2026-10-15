
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let feedbacks = [];
let proximoId = 1;

app.get('/', (req, res) => {
    res.send(`
        <h1>Feedbacks dos Alunos</h1>

        <form action="/feedbacks/enviar" method="POST">
            <label>Nome:</label><br>
            <input type="text" name="nome" required><br><br>

            <label>Comentário:</label><br>
            <textarea name="comentario" required></textarea><br><br>

            <button type="submit">Enviar Feedback</button>
        </form>

        <br>
        <a href="/feedbacks/lista">Ver feedbacks</a>
    `);
});

app.post('/feedbacks/enviar', (req, res) => {
    const nome = req.body.nome;
    const comentario = req.body.comentario;

    feedbacks.push({
        id: proximoId++,
        nome: nome,
        comentario: comentario
    });

    res.redirect('/feedbacks/lista');
});

app.get('/feedbacks/lista', (req, res) => {
    let html = `
        <h1>Lista de Feedbacks</h1>
        <a href="/">Voltar para a página inicial</a>
        <hr>
    `;

    if (feedbacks.length === 0) {
        html += '<p>Nenhum feedback cadastrado.</p>';
    }

    feedbacks.forEach(feedback => {
        html += `
            <div>
                <h3>${feedback.nome}</h3>
                <p>${feedback.comentario}</p>

                <form action="/feedbacks/remover" method="POST">
                    <input type="hidden" name="id" value="${feedback.id}">
                    <button type="submit">Remover</button>
                </form>

                <hr>
            </div>
        `;
    });

    res.send(html);
});

app.post('/feedbacks/remover', (req, res) => {
    const id = Number(req.body.id);

    feedbacks = feedbacks.filter(feedback => feedback.id !== id);

    res.redirect('/feedbacks/lista');
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
