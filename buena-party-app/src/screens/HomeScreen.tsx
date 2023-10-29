import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Background from '../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import NavBar from '../components/NavBar';
import GradientButtonL from '../components/GradientButtonL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButtonS from '../components/GradientButtonS';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';
import FirstScreen from './FirstScreen';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen')
const HomeScreen: React.FC<HomeScreenProps> = ({  }) => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const handleLogoutAndNavigate = () => {
        AsyncStorage.removeItem('authToken');
        navigation.navigate('FirstScreen');
    }

  useEffect(() => {

    const fetchUserName = async () => {
        try {
          const userStoredName = await AsyncStorage.getItem('nomeUser');
          console.log('userStoredName after setting:', userStoredName);
          if (userStoredName) {
            setUserName(userStoredName);
          }
        } catch (error) {
          console.error('Erro ao buscar o nome do usuário:', error);
        }
      };

    fetchUserName();
  }, []);

  return (
    <Background colors={[]}>
      {/*<SafeAreaView style={style.main}>
        <NavBar style={style.main} onPress={() => navigation.navigate('My Account')} />
  <View>
          <View style={style.container}>*/}
          <View>
            <Text style={style.text}>Usuário logado: {userName}</Text>
          </View>
          <GradientButtonS colors={[]} onPress={handleLogoutAndNavigate} style={{marginTop: 50}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sair</Text>
          </GradientButtonS>
          {/*
            <Text style={style.text}>Você não está participando de nenhum evento? Crie ou entre em um evento.</Text>
          </View>
          <View style={style.buttonBox}>
            <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Create Event')}>
              <Text style={styles.gradientButtonLText}>Criar Evento</Text>
            </GradientButtonL>
            <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Home Screen 2')}>
              <Text style={styles.gradientButtonLText}>Ver eventos</Text>
            </GradientButtonL>
            <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Edit Account')}>
              <Text style={styles.gradientButtonLText}>Editar Conta</Text>
            </GradientButtonL>
          </View>
        </View>
  </SafeAreaView>*/}
    </Background>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
  },
  container: {
    top: 250,
    width: '90%',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
  },
  buttonBox: {
    top: 370,
  },
});

export default HomeScreen;