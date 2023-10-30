import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import Background from '../components/Background';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
=======
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Background from '../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import NavBar2 from '../components/NavBar2';
>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
import GradientButtonS from '../components/GradientButtonS';
import EventBox from '../components/EventBox';
import GradientText from '../components/GradientText';
import axios, { AxiosResponse } from 'axios';
<<<<<<< HEAD

type Event = {
  id: number;
  criado_por: number;
  nome: string;
  data: string;
  hora: string;
  endereco: string;
};

type ListEventsProps = {
  navigation: StackNavigationProp<any>;
};

const urlAPI = 'http://localhost:3000';

const ListEvents: React.FC<ListEventsProps> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await axios.get(`${urlAPI}/events/list`);
        console.log('Response:', response.data);

        if (response.status === 200) {
          setEvents(response.data);
        } else {
          console.log('Nenhum evento encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    loadEvents();
  }, []);

  return (
    <Background colors={[]}>
      <SafeAreaView style={style.main}>
        <View style={style.container}>
          <View style={style.buttonContainer}>
            <GradientButtonS colors={[]} onPress={() => navigation.navigate('Register_Event')}>
              <Text style={styles.gradientButtonSText}>Criar evento</Text>
            </GradientButtonS>
          </View>
          <View style={style.eventContainer}>
            <Text style={style.text}>Eventos</Text>
            {events.length > 0 ? (
              events.map((event) => (
                <View key={event.id} style={style.eventBox}>
                  <GradientText style={styles.eventBoxText}>{event.nome}</GradientText>
                  <Text>Data: {event.data}</Text>
                  <Text>Hora: {event.hora}</Text>
                  <Text>Endereço: {event.endereco}</Text>
                  <Text>Criado por: {event.criado_por}</Text>
                </View>
              ))
            ) : (
              <Text style={style.noEventsText}>Nenhum evento encontrado.</Text>
            )}
            <Text style={style.text}>Eventos convidados</Text>
            <View style={style.eventBox}>
              <EventBox
                colors={[]}
                onPress={() => navigation.navigate('Event Details')}
                iconSource={require('../../assets/icons/more.png')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  eventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    padding: 10,
  },
  container: {
    top: 150,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
  },
  eventBox: {
    padding: 20,
  },
  noEventsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
});

export default ListEvents;
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../components/Images';

const baseTextSize = 29;
const screen = Dimensions.get('screen');
const textSize = (screen.width * 0.2 * baseTextSize) / 100;
type Event = {
    id: number;
    criado_por: number;
    nome: string;
    data: string;
    hora: string;
    endereço: string;
    // Adicione outros campos do evento aqui, se necessário
};

type ListEventsProps = {
    navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen');

const ListEvents: React.FC<ListEventsProps> = ({ navigation }) => {
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const userId = AsyncStorage.getItem('idUser')

    useEffect(() => {
        const Id = userId; // Substitua pelo ID do usuário logado

        axios
            .get(`http://localhost:3090/register/events/${Id}`)
            .then((response: AxiosResponse<Event[]>) => {
                const events = response.data;

                if (events.length === 0) {
                    console.log('O usuário não tem eventos.');
                } else {
                    setUserEvents(events);
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar eventos do usuário:', error);
            });
    }, []);

    return (
        <Background colors={[]}>
            <SafeAreaView style={style.main}>
                <View style={style.boxImage}>
                    <TouchableOpacity onPress={() => navigation.navigate('My Account')}>
                        <Images
                            style={style.back}
                            iconSource={require('../../assets/icons/profile.png')}
                        />
                    </TouchableOpacity>
                    <View style={style.LogoContainer}>
                        <Images
                            style={style.LogoBranco}
                            iconSource={require('../../assets/icons/LogoBranco.png')}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={style.container}>
                        <View style={style.buttonContainer}>
                            <GradientButtonS colors={[]} onPress={() => navigation.navigate('Create Event')}>
                                <Text style={styles.gradientButtonSText}>Criar evento</Text>
                            </GradientButtonS>
                            <View style={{ marginRight: 20 }}></View>
                            <GradientButtonS colors={[]} onPress={() => navigation.navigate('Create Event')}>
                                <Text style={styles.gradientButtonSText}>Entrar em evento</Text>
                            </GradientButtonS>
                        </View>
                        <View >
                            <View style={style.eventContainer2}>
                                <Text style={style.text}>Meus Eventos</Text>
                                {userEvents.length > 0 ? (
                                    userEvents.map((event) => (
                                        <View key={event.id} style={style.eventBox}>
                                            <EventBox colors={[]} onPress={() => navigation.navigate('Manage Event')} iconSource={require('../../assets/icons/settings.png')}>
                                                <GradientText style={styles.eventBoxText}>{event.nome}</GradientText>
                                                <Text>Data: {event.data}</Text>
                                                <Text>Hora: {event.hora}</Text>
                                                <Text>Endereço: {event.endereço}</Text>
                                            </EventBox>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={style.noEventsText}>Você não tem eventos.</Text>
                                )}
                                <Text style={style.text}>Eventos convidados</Text>
                                <View style={style.eventBox}>
                                    <EventBox colors={[]} onPress={() => navigation.navigate('Event Details')} iconSource={require('../../assets/icons/more.png')}>
                                        <GradientText style={styles.eventBoxText}>Casamento de Ana!</GradientText>
                                    </EventBox>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Background>
    );
};

const style = StyleSheet.create({
    main: {
        flex: 1
    },
    container: {
        flex: 1
    },
    boxImage: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        marginBottom: 40,

    },
    LogoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    LogoBranco: {
        width: width / 4,
        height: width / 4,
        alignItems: 'center',
        marginLeft: width / 7
    },
    back: {
        width: width / 6,
        height: width / 6,

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    eventContainer2: {
        width: width / 1
    },
    text: {
        color: 'white',
        fontSize: textSize,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    eventBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noEventsText: {
        color: 'white',
        fontSize: textSize,
        fontWeight: 'bold',
        textAlign: 'center'
    },


});

export default ListEvents;
>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
