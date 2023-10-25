import { React } from 'react';
import { View, Image, TextInput, Button } from 'react-native';

import Background from '../globalStyles/background';
import stylesLogin from '../styles/login';

export default function Login() {
    return (
        <Background>
            <View style={stylesLogin.container}>
                <Image source={require('../../assets/LogoGradiente.png')} style={stylesLogin.buenaPartyLogo}/>
                <TextInput placeholder='E-mail' style={stylesLogin.inputText}/>
                <TextInput placeholder='Senha' style={stylesLogin.inputText}/>
                <Button title='Login'/>
            </View>
        </Background>
    )
}