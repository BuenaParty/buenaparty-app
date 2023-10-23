import React, { useState } from 'react';
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../components/Images';
import NavBar from '../components/NavBar';
import FormBox from '../components/FormBox';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';

import axios from 'axios';
const { width, height } = Dimensions.get('screen');

const urlAPI = 'http://localhost:3090';

type RegisterProps = {
    navigation: StackNavigationProp<any>;
};

const Register: React.FC<RegisterProps> = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${urlAPI}/register/user`, {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha
            });

            if (response.data) {
                console.log(response.data);
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <Background colors={[]} style={style.background}>
            <SafeAreaView style={style.container}>
                <View style={style.boxImage}>
                    <TouchableOpacity onPress={() => navigation.navigate('FirstScreen')}>
                        <Images
                            style={style.back}
                            iconSource={require('../../assets/icons/back.png')}
                        />
                    </TouchableOpacity>
                    <View style={style.LogoContainer}>
                        <Images
                            style={style.LogoBranco}
                            iconSource={require('../../assets/icons/LogoBranco.png')}
                        />
                    </View>
                </View>
                <View>
                    <Text style={style.text}>Bem Vindo à BUENAPARTY!</Text>
                </View>
                <TouchableOpacity>
                    <Images style={style.profile} iconSource={require('../../assets/icons/perfil.png')} />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={style.formBox}>
                    <FormBox
                        colors={[]}
                        placeholder="Nome"
                        iconSource={require('../../assets/icons/danca.png')}
                        onChange={text => setNome(text)}
                        value={nome}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Telefone"
                        iconSource={require('../../assets/icons/phone.png')}
                        onChange={text => setTelefone(text)}
                        value={telefone}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Email"
                        iconSource={require('../../assets/icons/email.png')}
                        onChange={text => setEmail(text)}
                        value={email}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Senha"
                        iconSource={require('../../assets/icons/password.png')}
                        onChange={text => setSenha(text)}
                        value={senha}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Confirmar Senha"
                        iconSource={require('../../assets/icons/password.png')}
                        onChange={text => setConfirmarSenha(text)}
                        value={confirmarSenha}
                    />

                    <View style={style.buttonContainer}>
                        <GradientButtonM onPress={handleSubmit} colors={[]}>
                            <Text style={styles.gradientButtonMText}>Cadastrar</Text>
                        </GradientButtonM>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Background>
    );
};

const style = StyleSheet.create({
    background: {
        // Defina os estilos para o plano de fundo, se necessário.
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    boxImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 25,

    },
    LogoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    LogoBranco: {
        width: width / 4,
        height: width / 4,
        alignItems: 'center',
        marginRight: width / 6,
    },
    back: {
        width: width / 6,
        height: width / 6,
    },
    profile: {
        width: width / 4,
        height: width / 4
    },
    formBox: {
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default Register;
