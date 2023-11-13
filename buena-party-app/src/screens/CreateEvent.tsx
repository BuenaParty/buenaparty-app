import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
const { width, height } = Dimensions.get('screen')
const urlAPI = 'http://localhost:3000';

const CreateEvent: React.FC<CreateEventProps> = ({ navigation }) => {

  const [nome, setNome] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleSubmit = async () => {
    if (!nome || !endereco || !data || !horario) {
      setMensagem('Preencha todos os campos.');
      return;
    }
    
    try {
      const idUser = await AsyncStorage.getItem('idUser');
      const nomeUser = await AsyncStorage.getItem('nomeUser');

      const generateShortCode = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let shortCode = '';
    
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            shortCode += characters.charAt(randomIndex);
        }
    
        return shortCode;
    };

      const codigoConvite = generateShortCode();
      console.log('Unique Code:', codigoConvite);

      const response = await axios.post(`${urlAPI}/event/register`, {
        nome: nome,
        data: data,
        horario: horario,
        endereco: endereco,
        criado_por: idUser,
        codigo_convite: codigoConvite,
      });

      if (response.status === 200) {
        setMensagem('Evento criado com sucesso!');
        console.log('Evento criado com sucesso!');
        setNome('');
        setEndereco('');
        setHorario('');
        setData('');

        setTimeout(() => {
          navigation.navigate('ListEvents', { refresh: true });
        }, 1000);
      } else {
        console.log('Error creating event:', response);
        setMensagem('Erro ao registrar o evento. Verifique os campos preenchidos.');

      }
    } catch (error) {
      console.error('Erro ao registrar o evento:', error);
      setMensagem('Erro ao registrar o evento. Verifique os campos preenchidos.');
    }
  };

  
  return (
    <Background colors={[]} style={style.container}>
      <SafeAreaView style={style.main}>
      <View style={style.boxImage}>
          <TouchableOpacity onPress={handleGoBack}>
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
            placeholder='Data'
            iconSource={require('../../assets/icons/date.png')}
            onChange={text => setData(text)} 
            value={data}
            maskType='date'
          />
          <FormBox
            colors={[]}
            placeholder='Horário'
            iconSource={require('../../assets/icons/hour.png')}
            onChange={text => setHorario(text)}
            value={horario} 
            maskType={'time'}
          />

          <View style={style.button}>
            <GradientButtonM onPress={handleSubmit} colors={[]}>
              <Text style={styles.gradientButtonMText}>Criar Evento</Text>
            </GradientButtonM>

            {mensagem !== null && (
              <Text style={style.mensagem}>{mensagem}</Text>
            )}

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
    alignItems: 'center',
    justifyContent: 'center'
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
  boxImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    flex: 0.3,
    marginBottom: 100,
    paddingHorizontal: 10
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
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
});

export default CreateEvent;
