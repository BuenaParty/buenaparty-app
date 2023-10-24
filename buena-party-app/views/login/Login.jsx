import { React, useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';

import stylesLogin from '../styles/login';
import stylesGlobal from '../globalStyles/background';

export default function Login() {
    return (
        <View style={stylesGlobal.backgroundGradient}>
            <Image source={require('../../assets/LogoGradiente.png')} style={stylesLogin.buenaPartyLogo}/>
            <TextInput placeholder='E-mail' style={stylesLogin.inputText}/>
            <TextInput placeholder='Senha' style={stylesLogin.inputText}/>
            <Button title='Login'/>
        </View>
    )
}