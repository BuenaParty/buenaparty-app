import axios from 'axios';
import React, { useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';

// import { authUser } from '../../views/controllers/authController';

import Background from '../globalStyles/background';
import stylesLogin from '../styles/login';

export default function Login() {
    const [e_mail, setE_mail] = useState('');
    const [senha, setSenha] = useState('');

    const API_URL = 'http://localhost:3000';

    const handleLogin = async () => {
        try {
            console.log(`E-mail - ${e_mail} Senha - ${senha}`);
            const response = await axios.post(`${API_URL}/user/login`, { e_mail, senha });
            if (response.data) {
            console.log(`Usuário logado: ${JSON.stringify(response.data)}`);
        } else {
            console.log('Usuário não logado...');
        }} catch (error) {
            console.error(`Erro ao logar: ${error}`);
        }
    };

    return (
        <Background>
            <View style={stylesLogin.container}>
                <Image source={require('../../assets/LogoGradiente.png')} style={stylesLogin.buenaPartyLogo}/>
                <TextInput placeholder='E-mail' style={stylesLogin.inputText} onChangeText={setE_mail}/>
                <TextInput placeholder='Senha' style={stylesLogin.inputText} onChangeText={setSenha} secureTextEntry={true}/>
                <Button title='Login' onPress={handleLogin}/>
            </View>
        </Background>
    )
};