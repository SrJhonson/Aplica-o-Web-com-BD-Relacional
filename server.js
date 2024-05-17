const express = require('express');
const sql = require('mssql');

const app = express();

// Configuração do banco de dados Azure SQL
const dbConfig = {
    server: 'its-brazuca-man.database.windows.net',
    database: 'fatec-projeto',
    user: 'Administrador',
    password: '',
    options: {
        encrypt: true
    }
};

// Conecte-se ao banco de dados
sql.connect(dbConfig, function(err) {
    if (err) console.log(err);
});

// Crie uma rota para obter todos os usuários
app.get('/usuarios', function(req, res) {
    const request = new sql.Request();
    request.query('select * from Usuarios', function(err, recordset) {
        if (err) console.log(err);
        res.send(recordset);
    });
});

// Inicie o servidor
app.listen(5500, function() {
    console.log('Servidor rodando na porta 5500');
});

app.use(express.json());

// Rota para cadastro
app.post('/cadastro', function(req, res) {
    const request = new sql.Request();
    const { nome, email, senha } = req.body;
    request.query(`INSERT INTO Usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`, function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao realizar cadastro');
        } else {
            res.send('Cadastro realizado com sucesso!');
        }
    });
});

// Rota para login
app.post('/login', function(req, res) {
    const request = new sql.Request();
    const { usuario, senha } = req.body;
    request.query(`SELECT * FROM Usuarios WHERE usuario='${usuario}' AND senha='${senha}'`, function(err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao realizar login');
        } else if (recordset.recordset.length > 0) {
            res.send('Login realizado com sucesso!');
        } else {
            res.send('Usuário ou senha inválidos');
        }
    });
});
