const express = require('express');
const path = require('path');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Database configuration
const config = {
    user: 'Administrador',
    password: '9512468@.J',
    server: 'its-brazuca-man.database.windows.net',
    database: 'fatec-projeto',
    options: {
        encrypt: true
    }
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Clean the history table when the server starts
async function limparHistorico() {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        await request.query("DELETE FROM Historico");
        console.log('Tabela Historico limpa com sucesso.');
    } catch (error) {
        console.error('Erro ao limpar a tabela Historico:', error);
    }
}
limparHistorico();
// Rota para atualizar a vida do herói e do vilão
app.post('/atualizarVida', async (req, res) => {
    const { vidaHeroi, vidaVilao } = req.body;

    if (typeof vidaHeroi !== 'undefined' && typeof vidaVilao !== 'undefined' && !isNaN(vidaHeroi) && !isNaN(vidaVilao)) {
        try {
            await sql.connect(config);
            const request = new sql.Request();
            await request.query(`
                MERGE INTO Personagens AS target
                USING (VALUES ('heroi', ${vidaHeroi}), ('vilao', ${vidaVilao})) AS source (Nome, Vida)
                ON target.Nome = source.Nome
                WHEN MATCHED THEN
                    UPDATE SET Vida = source.Vida
                WHEN NOT MATCHED THEN
                    INSERT (Nome, Vida) VALUES (source.Nome, source.Vida);
            `);
            res.status(200).send('Vida do herói e do vilão atualizada com sucesso.');
        } catch (err) {
            console.error('Erro ao atualizar a vida do herói e do vilão:', err);
            res.status(500).send('Erro ao atualizar a vida do herói e do vilão.');
        }
    } else {
        console.error('Erro ao atualizar a vida do herói e do vilão: vidaHeroi ou vidaVilao estão indefinidos ou não são números válidos.');
        res.status(400).send('Erro ao atualizar a vida do herói e do vilão: vidaHeroi ou vidaVilao estão indefinidos ou não são números válidos.');
    }
});
// Rota para atualizar os dados do usuário
app.post('/atualizarUsuario', async (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se nome, email e senha estão definidos
    if (nome && email && senha) {
        try {
            await sql.connect(config);
            const request = new sql.Request();
            await request.query(`
    MERGE INTO usuario AS target
    USING (VALUES ('${nome}', '${email}', '${senha}')) AS source (nome, email, senha)
    ON target.email = source.email
    WHEN MATCHED THEN
        UPDATE SET nome = source.nome, senha = source.senha
    WHEN NOT MATCHED THEN
        INSERT (nome, email, senha) VALUES (source.nome, source.email, source.senha);
`);

            res.status(200).send('Dados do usuário atualizados com sucesso.');
        } catch (err) {
            console.error('Erro ao atualizar os dados do usuário:', err);
            res.status(500).send('Erro ao atualizar os dados do usuário.');
        }
    } else {
        // Caso nome, email ou senha sejam indefinidos
        console.error('Erro ao atualizar os dados do usuário: nome, email ou senha estão indefinidos.');
        res.status(400).send('Erro ao atualizar os dados do usuário: nome, email ou senha estão indefinidos.');
    }
});

// Rota para adicionar uma entrada na tabela de histórico
app.post('/adicionarHistorico', async (req, res) => {
    const { acao } = req.body;

    if (typeof acao !== 'undefined') {
        try {
            await sql.connect(config);
            const request = new sql.Request();
            await request.query(`
                INSERT INTO Historico (acao) VALUES ('${acao}');
            `);
            res.status(200).send('Ação adicionada ao histórico com sucesso.');
        } catch (err) {
            console.error('Erro ao adicionar ação ao histórico:', err);
            res.status(500).send('Erro ao adicionar ação ao histórico.');
        }
    } else {
        console.error('Erro ao adicionar ação ao histórico: ação está indefinida.');
        res.status(400).send('Erro ao adicionar ação ao histórico: ação está indefinida.');
    }
});

// Rota para fornecer os dados do herói e do vilão
app.get('/characters', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Consulta para obter os dados do herói
        const heroResult = await request.query("SELECT * FROM Personagens WHERE Nome = 'heroi'");
        const heroi = heroResult.recordset[0];

        // Consulta para obter os dados do vilão
        const villainResult = await request.query("SELECT * FROM Personagens WHERE Nome = 'vilao'");
        const vilao = villainResult.recordset[0];

        res.json({ heroi, vilao });
    } catch (error) {
        console.error('Erro ao buscar dados do herói e do vilão:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do herói e do vilão.' });
    }
});
// Rota para fornecer os dados do usuário
app.post('/usuario', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Consulta para obter os dados do usuário com base no nome e senha fornecidos
        const userResult = await request.query(`SELECT * FROM usuario WHERE nome = '${nome}' AND senha = '${senha}'`);
        const usuario = userResult.recordset[0];

        if (usuario) {
            res.status(200).send('Login bem-sucedido.');
        } else {
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
    }
});

// Rota para obter o histórico de ações
app.get('/historico', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        const result = await request.query("SELECT TOP 6 * FROM Historico ORDER BY id DESC ");
        const historico = result.recordset;

         // Limpar apenas as informações da tabela
        ///await request.query("DELETE FROM Historico");

        res.json({ historico });
    } catch (error) {
        console.error('Erro ao buscar histórico de ações:', error);
        res.status(500).json({ error: 'Erro ao buscar histórico de ações.' });
    }
});

// Rota para servir o arquivo HTML principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});