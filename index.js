const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let estadoJogo = {
    vidaHeroi: 100,
    vidaVilao: 100
};

app.post('/atualizarVida', (req, res) => {
    const { vidaHeroi, vidaVilao } = req.body;
    estadoJogo.vidaHeroi = vidaHeroi;
    estadoJogo.vidaVilao = vidaVilao;
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});