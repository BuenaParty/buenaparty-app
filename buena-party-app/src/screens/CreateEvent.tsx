import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../components/Images';
import NavBar from '../components/NavBar';
import FormBox from '../components/FormBox';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateEventProps = {
  navigation: StackNavigationProp<any>;
};

const urlAPI = 'http://localhost:3000';

const CreateEvent: React.FC<CreateEventProps> = ({ navigation }) => {

  const [nome, setNome] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser'); // Obtenha o userId do AsyncStorage
      const nomeUser = await AsyncStorage.getItem('nomeUser');
      console.log(userId);

      const response = await axios.post(`${urlAPI}/event/register`, {
        nome: nome,
        data: data,
        horario: horario,
        endereco: endereco,
        criado_por: nomeUser,
      });
  
      if (response.status === 201) {
        setMensagem('Evento criado com sucesso!');
        setNome('');
        setEndereco('');
        setHorario('');
        setData('');
  
        setTimeout(() => {
          navigation.navigate('HomeScreen');
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao registrar o evento:', error);
      setMensagem('Erro ao registrar o evento. Verifique os campos preenchidos!');
    }
  };
  
  return (
    <Background colors={[]} style={style.container}>
      <SafeAreaView style={style.main}>
        <NavBar onPress={() => navigation.navigate('Home Screen')} />

        <Text style={style.text}>Criar Evento</Text>
        <View style={style.form}>
          <FormBox
            colors={[]}
            placeholder='Nome'
            iconSource={require('../../assets/icons/party.png')}
            onChange={text => setNome(text)} // Atualiza o estado 'nome' com o texto do campo
            value={nome} // Define o valor do campo como 'nome'
          />
          <FormBox
            colors={[]}
            placeholder='Local'
            iconSource={require('../../assets/icons/address.png')}
            onChange={text => setEndereco(text)} 
            value={endereco}
          />
          <FormBox
            colors={[]}
            placeholder='(YYYY-MM-DD)'
            iconSource={require('../../assets/icons/date.png')}
            onChange={text => setData(text)} 
            value={data} 
          />
          <FormBox
            colors={[]}
            placeholder='Horário'
            iconSource={require('../../assets/icons/hour.png')}
            onChange={text => setHorario(text)}
            value={horario} 
          />

          <View style={style.button}>
            <GradientButtonM onPress={handleSubmit} colors={[]}>
              <Text style={styles.gradientButtonMText}>Registrar Evento</Text>
            </GradientButtonM>

            {mensagem ? <Text style={style.mensagem}>{mensagem}</Text>: null}
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profile: {
    width: 90,
    height: 90,
    left: 120,
  },
  container: {
    position: 'relative',
  },
  main: {
    position: 'absolute',
    top: 0,
  },
  form: {
    top: 20,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  mensagem: {
    color: 'green',
    marginTop: 10,
  },
});

export default CreateEvent;
