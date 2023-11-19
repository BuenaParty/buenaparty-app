import React, { useState, useEffect } from 'react'
import Background from '../components/Background';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../components/Images';
import NavBar from '../components/NavBar';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import GradientBox from '../components/GradientBox';
import InviteCodeEnter from '../components/InviteCodeEnter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type EnterEventProps = {
    navigation: StackNavigationProp<any>;
  };
  
  const { width } = Dimensions.get('screen');
  const baseTextSize = 25;
  const textSize = (width * 0.3 * baseTextSize) / 100;
  const urlAPI = 'http://localhost:3000';
  
  const EnterEvent: React.FC<EnterEventProps> = ({ navigation }) => {
    const [codigoConvite, setCodigoConvite] = useState('');
    const [userInfo, setUserInfo] = useState({ nome: '', e_mail: '', telefone: '' });

    useEffect(() => {
        const fetchData = async () => {
          // Obtenha o código de convite do AsyncStorage
          const codigoConvite = await AsyncStorage.getItem('codigoConvite');
          setCodigoConvite(codigoConvite || '');
    
          // Obtenha as informações do usuário logado usando o ID do usuário
          const idUser = await AsyncStorage.getItem('idUser');
          const response = await axios.get(`${urlAPI}/user/${idUser}`);
    
          if (response.status === 200) {
            const { nome, e_mail, telefone } = response.data;
            setUserInfo({ nome, e_mail, telefone });
          } else {
            console.log('Error fetching user information:', response);
            // Lide com o erro conforme necessário
          }
        };
    
        fetchData();
      }, []);

    // Função para lidar com a mudança no código do convite
    const handleCodeSubmit = (code: string) => {
        setCodigoConvite(code);
    };
  
    // Verificar o código no banco de dados
    const checkInviteCode = async () => {
      try {
        const response = await fetch(`${urlAPI}/event/byCode/${codigoConvite}`);
        const data = await response.json();
  
        if (response.ok) {
          console.log('Código correto! Redirecionando para detalhes do evento.');

          const userId = await AsyncStorage.getItem('idUser');

          const enterEventResponse = await axios.post(`${urlAPI}/event/enter`, {
            codigo_convite: codigoConvite,
            userId: userId,
          });
          
          if (enterEventResponse.status === 200) {
            console.log('Entrou no evento com sucesso!', enterEventResponse.data);

            const eventName = enterEventResponse.data.event.nome;
            // Lógica adicional ou navegação pode ser adicionada aqui
            navigation.navigate('EventInfo', { eventName });
          } else {
            console.log('Erro ao entrar no evento:', enterEventResponse.data);
            // Manipule o erro conforme necessário
          }
        } else {
          console.log('Nenhum evento encontrado para o código digitado. Tente novamente.');
          alert('Nenhum evento encontrado para o código digitado. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao verificar o código:', error);
      }
    };

    return (
        <Background colors={[]}>
            <SafeAreaView style={style.main}>
                <View style={style.boxImage}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
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
                <Text style={style.text}>Entrar em Evento</Text>
                <View style={style.boxContainer}>
                    <GradientBox colors={[]} iconSource={require('../../assets/icons/danca.png')}>
                        <Text style={styles.formBoxTextInput}>
                            {userInfo.nome}
                        </Text>
                    </GradientBox>
                    <GradientBox colors={[]} iconSource={require('../../assets/icons/phone.png')}>
                        <Text style={styles.formBoxTextInput}>
                            {userInfo.telefone}
                        </Text>
                    </GradientBox>
                    <GradientBox colors={[]} iconSource={require('../../assets/icons/email.png')}>
                        <Text style={styles.formBoxTextInput}>
                            {userInfo.e_mail}
                        </Text>
                    </GradientBox>
                </View>
                <View style={style.codeContainer}>
                        <InviteCodeEnter colors={['#A12577', '#42286C']} onCodeChange={handleCodeSubmit} />
                    </View>
                <View style={style.button}>
                    <GradientButtonM onPress={checkInviteCode} colors={[]}>
                        <Text style={styles.gradientButtonMText}>Entrar em evento</Text>
                    </GradientButtonM>
                </View>
            </SafeAreaView>
        </Background>
    )
}
const style = StyleSheet.create({
    boxImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        flex: 0.3,
        marginBottom: 20,
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
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,

    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: textSize,

    },
    button: {
        top: '130%',
        position: 'absolute'
    },
    boxContainer:{
        top:60
    },
    codeContainer: {
        top: 100,
        alignItems: 'center',
      },
});
export default EnterEvent;