import React, { useEffect } from 'react';
import Background from '../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Images';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import GradientButtonL from '../components/GradientButtonL';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FirstScreenProps = {
  navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen');
const FirstScreen: React.FC<FirstScreenProps> = ({ navigation }) => {
  useEffect(() => {
    // Verifique se há um token armazenado localmente ao carregar a tela FirstScreen
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    // Verifique se há um token no AsyncStorage
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken) {
      // Se houver um token, mostre o botão de logout
      // O botão de logout não terá efeito se o usuário não estiver logado
      setLogoutButtonVisible(true);
    }
  };

  const [logoutButtonVisible, setLogoutButtonVisible] = React.useState(false);

  const handleLogout = async () => {
    // Remova o token do AsyncStorage ao fazer logout
    await AsyncStorage.removeItem('authToken');
    setLogoutButtonVisible(false);
  };

  return (
    <View style={style.View}>
      <Background colors={["#070624", "#000000", "#070624"]}>
        <View style={style.box}>
          <Logo style={style.Logo} iconSource={require('../../assets/icons/LogoGradiente.png')} />

          <GradientButtonL colors={[]} onPress={() => navigation.navigate('Login')} >
            <Text >Entrar</Text>
          </GradientButtonL>
          <GradientButtonL colors={[]} onPress={() => navigation.navigate('Register')}>
            <Text >Cadastrar</Text>
          </GradientButtonL>

          {logoutButtonVisible && (
            <TouchableOpacity onPress={handleLogout}>
              <Text>Sair</Text>
            </TouchableOpacity>
          )}
        </View>

      </Background>
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    width: width,
    height: height,
  },
  Logo: {
    width: width / 2,
    height: width / 2,
    marginBottom: '30%',
  },
  box:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  }

});

export default FirstScreen;
