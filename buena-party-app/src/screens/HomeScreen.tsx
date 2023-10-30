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
import CreateEvent from './CreateEvent';
import ListEvents from './ListEvents';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const { width, height } = Dimensions.get('screen')

const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [logoutButtonVisible, setLogoutButtonVisible] = React.useState(false);
  const handleLogout = async () => {
    // Remova o token do AsyncStorage ao fazer logout
    await AsyncStorage.removeItem('authToken');
    setLogoutButtonVisible(false);
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
      <View>
        <Text style={style.text}>Usuário logado: {userName}</Text>
      </View>
      <GradientButtonS colors={[]} onPress={handleLogout} style={{ marginTop: 50 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sair</Text>
      </GradientButtonS>
      <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.gradientButtonLText}>Criar Evento</Text>
      </GradientButtonL>
      <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('ListEvents')}>
        <Text style={styles.gradientButtonLText}>Ver eventos</Text>
      </GradientButtonL>

      {/*<GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Edit Account')}>
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