const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        reqrequireduire: true,
    },
    rg: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ClientSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;