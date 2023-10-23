import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Background from '../components/Background';
import Images from '../components/Images';
import FormBox from '../components/FormBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage

type LoginProps = {
  navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen')
const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verifique se há um token armazenado localmente ao carregar a tela de login
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    // Verifique se há um token no AsyncStorage
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken) {
      // Se houver um token, navegue para a tela Home diretamente
      navigation.navigate('HomeScreen');
    }
  };
  const { width, height } = Dimensions.get('screen')
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3090/login', {
        email: email,
        senha: senha,
      });

      if (response.status === 200) {
        console.log(response.data);

        // Armazene o token no AsyncStorage após um login bem-sucedido
        await AsyncStorage.setItem('authToken', response.data.token);
        await AsyncStorage.setItem(`idUser`, response.data.id);
        await AsyncStorage.setItem(`nomeUser`, response.data.nome);

        navigation.navigate('HomeScreen');

      }
    } catch (error) {
      console.error('Erro ao realizar o login: ', error);
      setError('Erro ao fazer o login. Verifique suas credenciais.');
      setEmail('');
      setSenha('');
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
              style={style.LogoBranca}
              iconSource={require('../../assets/icons/LogoBranco.png')}
            />
          </View>
        </View>

        <Text style={style.Text}>Login</Text>

        <View style={style.formBox}>
          <FormBox
            colors={[]}
            placeholder='Email'
            iconSource={require('../../assets/icons/email.png')}
            onChange={(text) => {
              setEmail(text);
            }}
            value={email}
          ></FormBox>
          <FormBox
            colors={[]}
            placeholder='Senha'
            iconSource={require('../../assets/icons/password.png')}
            onChange={(text) => setSenha(text)}
            value={senha}
          ></FormBox>
          <TouchableOpacity>
            <Text style={style.Senha}>Esqueceu a senha?</Text>
            
          </TouchableOpacity>
          {error ? <Text style={style.error}>{error}</Text> : null}
          <View>
            <GradientButtonM style={style.buttonM} colors={[]} onPress={handleLogin}>
              <Text style={styles.gradientButtonMText}>Entrar</Text>
            </GradientButtonM>
            
          </View>
          
        </View>
      </SafeAreaView>

    </Background>




  );
};

const style = StyleSheet.create({
  background: {
    flex: 1
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
    flex: 0.3,
    marginBottom: 60

  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',

  },
  Text: {
    color: 'white',
    height: height / 6,
    fontSize: 35,
    fontWeight: 'bold'
  },
  LogoBranca: {
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
    flex:1
  },
  buttonM: {
    top: 70,

  },
  
  Senha: {
    color: 'white',
    fontSize: 17,
    textAlign:'center'
  },
  error:{
    color:'red'
  }

});

export default Login;