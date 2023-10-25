import { React } from 'react';
import { View, TextInput, Button } from 'react-native';

import Background from '../globalStyles/background';
import stylesRegister from '../styles/register';

export default function Register() {
    return (
        <Background>
            <View>
                <TextInput placeholder='Digite o seu nome' style={stylesRegister.inputText}/>
                <TextInput placeholder='Digite o seu e-mail'style={stylesRegister.inputText}/>
                <TextInput placeholder='Digite a sua senha'style={stylesRegister.inputText}/>
                <TextInput placeholder='Confirme a sua senha'style={stylesRegister.inputText}/>
                <TextInput placeholder='Digite o seu telefone'style={stylesRegister.inputText}/>
                <Button title='Registre-se'/>
            </View>
        </Background>
    );
}