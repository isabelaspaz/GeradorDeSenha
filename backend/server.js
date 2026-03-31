const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'senha-secreta-do-projeto';

app.use(cors());
app.use(bodyParser.json());

const usuarios = [];

app.get('/', (req, res) => {
    res.send('API está rodando');
});

app.post('/signup', async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha } = req.body;

        if (!nome || !email || !senha || !confirmarSenha) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios.',
            });
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

        if (!emailValido) {
            return res.status(400).json({
                erro: 'E-mail inválido.',
            });
        }

        if (senha !== confirmarSenha) {
            return res.status(400).json({
                erro: 'As senhas precisam ser iguais.',
            });
        }

        const usuarioExistente = usuarios.find(
            (usuario) => usuario.email === email.trim().toLowerCase()
        );

        if (usuarioExistente) {
            return res.status(400).json({
                erro: 'Este e-mail já foi cadastrado.',
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            id: usuarios.length + 1,
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha: senhaCriptografada,
        };

        usuarios.push(novoUsuario);

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso.',
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro interno ao cadastrar usuário.',
        });
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: 'E-mail e senha são obrigatórios.',
            });
        }

        const usuario = usuarios.find(
            (item) => item.email === email.trim().toLowerCase()
        );

        if (!usuario) {
            return res.status(401).json({
                erro: 'E-mail ou senha inválidos.',
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: 'E-mail ou senha inválidos.',
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso.',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro interno ao realizar login.',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});