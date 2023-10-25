import React from 'react';
import { View, Image, Button } from 'react-native';

import stylesIndex from '../styles/index'
import Background from '../globalStyles/background';

export default function Index({ navigation }) {
    return (
        <Background>
            <View style={stylesIndex.container}>
            <Image source={require('../../assets/LogoGradiente.png')} style={stylesIndex.buenaPartyLogo}/>
            <Button title='Login' onPress={ _ => navigation.navigate('Login')}/>
            <Button title='Registre-se' onPress={ _ => navigation.navigate('Register')}/>
        </View>
        </Background>
    );
}