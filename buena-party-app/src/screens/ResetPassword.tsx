import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Background from '../components/Background';
import Images from '../components/Images';
import FormBox from '../components/FormBox';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const urlAPI = 'http://localhost:3000';

type ResetPasswordProps = {
    navigation: StackNavigationProp<any>;
};


const ResetPassword: React.FC<ResetPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailValido, setEmailValido] = useState(true);
  const [password, setNewPassword] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaValida, setSenhaValida] = useState(true);
  const [senhasIguais, setSenhasIguais] = useState(true);

  const isEmailValid = (email) => {
    // validação de formato do email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

const isSenhaValida = (password) => {
    // validação de senha com pelo menos 8 caracteres incluindo letras e numeros
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return senhaRegex.test(password);
};

  const handleGoBack = () => {
    navigation.goBack();
}

const handleSubmit = async () => {
  if (!isEmailValid(email)) {
      // Email inválido
      setEmailValido(false);
      console.log('Email inválido');
      return;
  } else {
      setEmailValido(true);
  }

  if (!isSenhaValida(password)) {
      // Senha inválida
      setSenhaValida(false);
      console.log('Senha inválida. A senha deve conter pelo menos 8 caracteres com letras e números.');
      return;
  } else {
      setSenhaValida(true);
  }

  if (password !== confirmarSenha) {
      // Senha e confirmação de senha não coincidem
      setSenhasIguais(false);
      return;
  } else {
      setSenhasIguais(true);
  }

  try {
      const response = await axios.post(`${urlAPI}/user/reset`, {
          e_mail: email,
          newPassword: password,
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
    <Background colors={[]}>
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
            <View style={style.nomeTela}>
                <Text style={style.text}>Redefinir Senha</Text>
            </View>
            {/*<TouchableOpacity>
                <Images style={style.profile} iconSource={require('../../assets/icons/perfil.png')} />
</TouchableOpacity>*/}
            <ScrollView contentContainerStyle={style.formBox}>
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
                            setNewPassword(text);
                            setSenhaValida(true); // Redefina a validação do campo de senha
                        }}
                        value={password}
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
                    <Text style={styles.gradientButtonMText}>Redefinir</Text>
                </GradientButtonM>
            </View>

        </SafeAreaView>
    </Background>
);
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  boxImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    marginVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
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
  formBox: {
    alignItems: 'center',
    marginVertical: 80,
  },
  buttonContainer: {},
  error: {
    color: 'green',
    paddingHorizontal: 50,
  },
  gradientButtonMText: {
    // Defina os estilos do texto do botão, se necessário.
  },
  nomeTela: {
    marginVertical: 20,
  }
});

export default ResetPassword;
