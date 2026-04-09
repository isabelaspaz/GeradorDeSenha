require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'senhaSecreta';

app.use(cors());
app.use(bodyParser.json());

function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não informado.' });
    }

    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ erro: 'Token inválido.' });
    }

    const token = partes[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token expirado ou inválido.' });
    }
}

app.get('/', (req, res) => {
    res.send('API está rodando!');
});

app.post('/signup', async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha } = req.body;

        if (!nome || !email || !senha || !confirmarSenha) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        const emailFormatado = email.trim().toLowerCase();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado);

        if (!emailValido) {
            return res.status(400).json({ erro: 'E-mail inválido.' });
        }

        if (senha !== confirmarSenha) {
            return res.status(400).json({ erro: 'As senhas precisam ser iguais!' });
        }

        const [usuariosExistentes] = await db.execute(
            'SELECT id FROM usuarios WHERE email = ?',
            [emailFormatado]
        );

        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ erro: 'Este e-mail já foi cadastrado!' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await db.execute(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome.trim(), emailFormatado, senhaCriptografada]
        );

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro no signup:', error);
        return res.status(500).json({ erro: 'Erro interno ao cadastrar usuário!' });
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
        }

        const emailFormatado = email.trim().toLowerCase();
        const [usuarios] = await db.execute(
            'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
            [emailFormatado]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        const usuario = usuarios[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso.',
            token,
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });
    } catch (error) {
        console.error('Erro no signin:', error);
        return res.status(500).json({ erro: 'Erro interno ao realizar login.' });
    }
});

app.post('/senhas', autenticarToken, async (req, res) => {
    try {
        const { nomeAplicativo, senha } = req.body;
        const usuarioId = req.usuario.id;

        if (!nomeAplicativo || !nomeAplicativo.trim()) {
            return res.status(400).json({ erro: 'O nome do aplicativo é obrigatório.' });
        }

        if (!senha || !senha.trim()) {
            return res.status(400).json({ erro: 'A senha é obrigatória.' });
        }

        const [resultado] = await db.execute(
            'INSERT INTO senhas (usuario_id, nome_aplicativo, senha) VALUES (?, ?, ?)',
            [usuarioId, nomeAplicativo.trim(), senha.trim()]
        );

        return res.status(201).json({
            mensagem: 'Senha salva com sucesso.',
            senha: {
                id: resultado.insertId,
                nomeAplicativo: nomeAplicativo.trim(),
                senha: senha.trim(),
            },
        });
    } catch (error) {
        console.error('Erro ao criar senha:', error);
        return res.status(500).json({ erro: 'Erro interno ao criar senha.' });
    }
});

app.get('/senhas', autenticarToken, async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const [senhas] = await db.execute(
            `SELECT 
                id, 
                nome_aplicativo AS nomeAplicativo, 
                senha, 
                created_at AS createdAt 
             FROM senhas 
             WHERE usuario_id = ? 
             ORDER BY id DESC`,
            [usuarioId]
        );

        return res.status(200).json(senhas);
    } catch (error) {
        console.error('Erro ao listar senhas:', error);
        return res.status(500).json({ erro: 'Erro interno ao listar senhas.' });
    }
});


app.delete('/senhas/:id', autenticarToken, async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const senhaId = req.params.id;

        const [resultado] = await db.execute(
            'DELETE FROM senhas WHERE id = ? AND usuario_id = ?',
            [senhaId, usuarioId]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Senha não encontrada.' });
        }

        return res.status(200).json({ mensagem: 'Senha excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir senha:', error);
        return res.status(500).json({ erro: 'Erro interno ao excluir senha.' });
    }
});

// Inicialização
async function testarConexao() {
    try {
        await db.execute('SELECT 1');
        console.log('Conectado ao MySQL com sucesso');
    } catch (error) {
        console.error('Erro ao conectar no MySQL:', error);
    }
}

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    await testarConexao();
});