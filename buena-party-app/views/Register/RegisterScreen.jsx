import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function RegisterScreen() {
    const [nome, setNome] = useState('');
    const [e_mail, setE_mail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    
    return (
        <View>
            <Text>Register</Text>
            <Input placeholder='Digite o seu nome' value={[]} onChangeText={[]}></Input>
            <Input placeholder='Digite o seu e-mail' value={[]} onChangeText={[]}></Input>
            <Input placeholder='Digite a sua senha' value={[]} onChangeText={[]}></Input>
            <Input placeholder='Digite novamente a sua senha' value={[]} onChangeText={[]}></Input>
            <Input placeholder='Digite o seu telefone' value={[]} onChangeText={[]}></Input>
            <Button title='Registre-se' onPress={[]}/>
        </View>
    );
}