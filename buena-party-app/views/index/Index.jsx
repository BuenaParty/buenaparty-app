import React from 'react';
import { View, Image, Button } from 'react-native';

import stylesIndex from '../styles/index'

export default function Index() {
    return (
        <View style={stylesIndex.container}>
            <Image source={require('../../assets/LogoGradiente.png')} style={stylesIndex.buenaPartyLogo}/>
            <Button title='Login'/>
            <Button title='Registre-se'/>
        </View>
    );
}