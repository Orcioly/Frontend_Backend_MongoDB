import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from './api';

export default function UsuarioCadastrar() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [nickname, setNickname] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();

        data.append('name', name);
        data.append('lastname', lastname);
        data.append('nickname', nickname);
        data.append('rg', rg);
        data.append('cpf', cpf);
        data.append('gender', gender);
        data.append('email', email);
        data.append('password', name);

        await api.post('/auth/register', data);

        // console.log(data);

        alert('Cadastro realizado com sucesso!');

        history.push('/app');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <a>Nome:</a>
                <input
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <a>Sobrenome:</a>
                <input
                    value={lastname}
                    onChange={event => setLastname(event.target.value)}
                />
                <a>Apelido:</a>
                <input
                    value={nickname}
                    onChange={event => setNickname(event.target.value)}
                />
                <a>Rg:</a>
                <input
                    value={rg}
                    onChange={event => setRg(event.target.value)}
                />
                <a>Cpf:</a>
                <input
                    value={cpf}
                    onChange={event => setCpf(event.target.value)}
                />
                <a>Sexo:</a>
                <input
                    value={gender}
                    onChange={event => setGender(event.target.value)}
                />
                <a>Email:</a>
                <input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <a>Senha:</a>
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}
