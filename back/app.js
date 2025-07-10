const express = require("express");
const cors = require("cors");
const port = 3002;
const app = express();
// const multer = require('multer')

app.use(cors());
app.use(express.json());

app.listen(port, ()=> console.log ("Rodando na porta " + port));

const connection = require('./db/connection.js');

// cadastro usuarias 

app.post('/usuarias', (req, res) => {
    const { nome, email, idade, cpf, senha } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, idade, cpf, senha) VALUES(?, ?, ?, ?, ?)';

    connection.query(query, [nome, email, idade, cpf, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao criar conta' });
        }

        const selectQuery = 'SELECT * FROM usuarios WHERE id = ?';
        connection.query(selectQuery, [result.insertId], (err, userResult) => {
            if (err || userResult.length === 0) {
                return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuária cadastrada' });
            }

            res.json({
                success: true,
                message: "Conta criada com sucesso",
                data: userResult[0]
            });
        });
    });
});

// login dos usuarias 

app.post('/login', (req, res) => { 
    const { nome, email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE nome = ? AND email = ? AND senha = ?';
    connection.query(query, [nome, email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }
        if (results.length > 0) {
            res.json({ success: true, data: results[0] });
        } else {
            res.json({ success: false, message: 'Nome, email ou senha incorretos' });
        }
    });
});

// deletar usuario 

app.delete('/usuarios/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id
    )
    let query = "DELETE FROM usuarios WHERE id = (?)";
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    });
})

// buscar usuarias 

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuarios WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar usuária' });
        }
        if (results.length > 0) {
            res.json({ success: true, data: results[0] });
        } else {
            res.json({ success: false, message: 'Usuária não encontrada' });
        }
    });
});

// editar usuarias 

app.put('/usuario/editar/nome/:id', (request, response) => { 
    const params = [
        request.body.nome,
        request.params.id
    ];

    const query = "UPDATE usuarios SET nome = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Erro ao atualizar nome",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Nome atualizado com sucesso",
            data: results
        });
    });
});

app.put('/usuario/editar/email/:id', (request, response) => { 
    const params = [
        request.body.email,
        request.params.id
    ];

    const query = "UPDATE usuarios SET email = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Erro ao atualizar email",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Email atualizado com sucesso",
            data: results
        });
    });
});

app.put('/usuario/editar/senha/:id', (request, response) => { 
    const params = [
        request.body.senha,
        request.params.id
    ];

    const query = "UPDATE usuarios SET senha = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Erro ao atualizar senha",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Senha atualizada com sucesso",
            data: results
        });
    });
});

// rota das notas 

// adicionar 

app.post('/adicionarNota/:usuario_id', (req, res) => {
    const { titulo } = req.body;
    const { usuario_id } = req.params;

    const query = 'INSERT INTO anotacoes (titulo, usuario_id) VALUES(?, ?)';
    
    connection.query(query, [titulo, usuario_id], (err, result) => {
        if (err) {
            console.error("Erro ao inserir nota:", err); 
            return res.status(500).json({ success: false, message: 'Erro ao adicionar nota' });
        }

        res.json({ success: true, message: "Nota adicionada com sucesso" });
    });
});

app.put('/notas/:id/conteudo', (request, response) => { 
    const params = [
        request.body.conteudo,
        request.params.id
    ];

    const query = "UPDATE anotacoes SET conteudo = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Erro ao atualizar conteúdo",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Conteúdo atualizado com sucesso",
            data: results
        });
    });
});

// buscar notas 

app.get('/notas', (req, res) => {
    const query = 'SELECT id, titulo FROM anotacoes';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar nota' });
        }
        res.json({ success: true, data: results });
    });
});

// deletar as notas 

app.delete('/notas/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM anotacoes WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar nota'})
        }
        res.json({success: true, message: "Nota deletada"})
    })
})

// chamar id para aparecer apenas uma nota por vez

app.get('/notas/:id', (req, res) => {
    const {id} = req.params;
    const query = 'SELECT * FROM anotacoes WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar nota' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Nota não encontrada' });
        }
        res.json({ success: true, data: results[0] });
    });
});

// rotas para os compromissos 

app.post('/compromissos', (req, res) => {
    const { usuario_id, titulo, descricao, dia, hora, aviso_antecipado } = req.body;

    const query = 'INSERT INTO compromissos (usuario_id, titulo, descricao, dia, hora, aviso_antecipado) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [usuario_id, titulo, descricao, dia, hora, aviso_antecipado || 0], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erro ao salvar compromisso' });
        }

        res.json({ success: true, message: 'Compromisso salvo com sucesso', id: result.insertId });
    });
});

app.get('/compromissos', (req, res) => {
    const { usuario_id, dia } = req.query;

    const query = 'SELECT id, titulo, descricao, hora FROM compromissos WHERE usuario_id = ? AND dia = ? ORDER BY hora';
    connection.query(query, [usuario_id, dia], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erro ao buscar compromissos' });
        }

        res.json({ success: true, compromissos: results });
    });
});
