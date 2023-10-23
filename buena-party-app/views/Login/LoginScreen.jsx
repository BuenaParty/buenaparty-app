import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function LoginScreen() {
    const [nome, setNome] = useState('');
    const [e_mail, setE_mail] = useState('');

    return (
        <View>
            <Text>Login</Text>
            <Input placeholder='Digite o seu e-mail' value={[]} onChangeText={[]}></Input>
            <Input placeholder='Digite a sua senha' value={[]} onChangeText={[]}></Input>
            <Button title='Login' onPress={[]}/>
        </View>
    );
}