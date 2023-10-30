<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
=======
// No componente CreateAccountount

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Background from '../components/Background';
>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../components/Images';
import NavBar from '../components/NavBar';
import FormBox from '../components/FormBox';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateEventProps = {
  navigation: StackNavigationProp<any>;
};

const urlAPI = 'http://localhost:3000';

const CreateEvent: React.FC<CreateEventProps> = ({ navigation }) => {

  const [nome, setNome] = useState(''); 
  const [local, setLocal] = useState(''); 
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser'); // Obtenha o userId do AsyncStorage
  
      console.log(userId);

      const response = await axios.post(`${urlAPI}/event/register`, {
        nome: nome,
        data: data,
        hora: horario,
        local: local,
        criado_por: userId
      });
  
      if (response.status === 201) {
        setMensagem('Evento criado com sucesso!');
        setNome('');
        setLocal('');
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
            onChange={text => setLocal(text)} 
            value={local}
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
=======
import { ScrollView } from 'react-native-gesture-handler';

type CreateAccountountProps = {
    navigation: StackNavigationProp<any>;
};
const baseTextSize = 29;
const screen = Dimensions.get('screen');
const textSize = (screen.width * 0.2 * baseTextSize) / 100;

const { width, height } = Dimensions.get('screen');
const CreateAccount: React.FC<CreateAccountountProps> = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // UseEffect para buscar os dados do usuário e preencher os estados ao carregar a tela de edição
    useEffect(() => {
        // Faça uma solicitação GET para obter os dados do usuário com base no ID
        const userId = 1; // Substitua pelo ID do usuário que está editando
        axios.get(`http://localhost:3090/api/user/${userId}`)
            .then((response) => {
                const userData = response.data; // Os dados do usuário obtidos do servidor
                setNome(userData.nome);
                setTelefone(userData.telefone);
                setEmail(userData.email);
                // Defina outros estados conforme necessário
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    }, []);

    const handleEdit = async () => {
        try {
            const userId = 1; // Substitua pelo ID do usuário que está editando

            // Faça uma solicitação PUT para atualizar os dados do usuário
            await axios.put(`http://localhost:3090/update/user/${userId}`, {
                nome: nome,
                telefone: telefone,
                email: email,
                senha: senha,
                // Inclua outros campos conforme necessário
            });

            // Redirecione para a tela de perfil ou outra tela após a edição bem-sucedida
            navigation.navigate('My Account');
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    };

    return (
        <Background colors={[]} style={style.container}>
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
                <Text style={{ fontSize: textSize, color: 'white', fontWeight: 'bold',marginBottom:38 }}>Criar Evento</Text>
                <ScrollView contentContainerStyle={style.formBox}>
              
                    
                
                    <FormBox
                        colors={[]}
                        placeholder="Nome"
                        iconSource={require('../../assets/icons/party.png')}
                        onChange={text => setNome(text)}
                        value={nome}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Descrição"
                        iconSource={require('../../assets/icons/aviso.png')}
                        onChange={text => setTelefone(text)}
                        value={telefone}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Local"
                        iconSource={require('../../assets/icons/email.png')}
                        onChange={text => setEmail(text)}
                        value={email}
                    />
                    <FormBox
                        colors={[]}
                        placeholder="Data"
                        iconSource={require('../../assets/icons/address.png')}
                        onChange={text => setSenha(text)}
                        value={senha}
                    />

                    <FormBox
                        colors={[]}
                        placeholder="Horário"
                        iconSource={require('../../assets/icons/hour.png')}
                        onChange={text => setConfirmarSenha(text)}
                        value={confirmarSenha}
                    />
                </ScrollView>
                <View style={style.buttonContainer}>
                    <GradientButtonM onPress={handleEdit} colors={[]}>
                        <Text style={styles.gradientButtonMText}>Confirmar</Text>
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
        flex: 1
    },
    boxImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        marginBottom: 40
    },
    text: {
        flex:2,

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
        height: width / 4,
        marginBottom: 25
    },
    formBox: {
        alignItems: 'center',
        flex:1
        
    },
    buttonContainer: {
        marginTop: 0,
    },
});

export default CreateAccount;
>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
