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

const urlAPI = 'http://localhost:3000';

type RegisterProps = {
    navigation: StackNavigationProp<any>;
};

const Register: React.FC<RegisterProps> = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [senhaValida, setSenhaValida] = useState(true);
    const [emailValido, setEmailValido] = useState(true);
    const [senhasIguais, setSenhasIguais] = useState(true);

    const isEmailValid = (email) => {
        // validação de formato do email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const isSenhaValida = (senha) => {
        // validação de senha com pelo menos 8 caracteres incluindo letras e numeros
        const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return senhaRegex.test(senha);
    };

    const handleSubmit = async () => {
        if (!isEmailValid(email)) {
            // Email inválido
            setEmailValido(false);
            console.log('Email inválido');
            return;
        } else {
            setEmailValido(true);
        }

        if (!isSenhaValida(senha)) {
            // Senha inválida
            setSenhaValida(false);
            console.log('Senha inválida. A senha deve conter pelo menos 8 caracteres com letras e números.');
            return;
        } else {
            setSenhaValida(true);
        }

        if (senha !== confirmarSenha) {
            // Senha e confirmação de senha não coincidem
            setSenhasIguais(false);
            return;
        } else {
            setSenhasIguais(true);
        }

        try {
            const response = await axios.post(`${urlAPI}/user/register`, {
                nome: nome,
                e_mail: email,
                telefone: telefone,
                senha: senha
            });

            if (response.data) {
                setSenhaValida(true);
                setEmailValido(true);
                setSenhasIguais(true);
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
                        onChange={(text) => {
                            setEmail(text);
                            setEmailValido(true); // Redefina a validação do campo de email
                        }}
                        value={email}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Senha"
                        iconSource={require('../../assets/icons/password.png')}
                        onChange={(text) => {
                            setSenha(text);
                            setSenhaValida(true); // Redefina a validação do campo de senha
                        }}
                        value={senha}
                        type="password"
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Confirmar Senha"
                        iconSource={require('../../assets/icons/password.png')}
                        onChange={(text) => {
                            setConfirmarSenha(text);
                            setSenhasIguais(true); // Redefina a validação de senhas iguais
                        }}
                        value={confirmarSenha}
                        type="password"
                    />
                    {senhaValida ? null : (
                        <Text style={style.error}>A senha deve conter pelo menos 8 caracteres com letras e números.</Text>
                    )}
                    {senhasIguais ? null : (
                        <Text style={style.error}>As senhas não coincidem. Por favor, tente novamente.</Text>
                    )}
                    {emailValido ? null : (
                        <Text style={style.error}>Por favor, insira um e-mail válido.</Text>
                    )}
                </ScrollView>
                <View style={style.buttonContainer}>
                    <GradientButtonM onPress={handleSubmit} colors={[]}>
                        <Text style={styles.gradientButtonMText}>Cadastrar</Text>
                    </GradientButtonM>
                </View>

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
        fontWeight:'bold'

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
        marginTop: 0,
    },
    error: {
        color: 'green',
        paddingHorizontal: 50,
      },
});

export default Register;
