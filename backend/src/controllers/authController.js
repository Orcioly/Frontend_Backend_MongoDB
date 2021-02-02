const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const Client = require('../models/Client');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

// Rota de cadastro de usuário
router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await Client.findOne({ email }))
            return res.status(400).send({ error: 'Client already exists' });

        const client = await Client.create(req.body);

        client.password = undefined;

        return res.send({
            client,
            token: generateToken({ id: client.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

// Rota de autenticação do usuário
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const client = await Client.findOne({ email }).select('+password');

    if (!client)
        return res.status(400).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, client.password))
        return res.status(400).send({ error: 'Invalid password' });

    client.password = undefined;

    res.send({
        client,
        token: generateToken({ id: client.id }),
    });
});



module.exports = app => app.use('/auth', router);