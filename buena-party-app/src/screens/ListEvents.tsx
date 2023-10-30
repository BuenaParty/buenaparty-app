import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import GradientButtonS from '../components/GradientButtonS';
import EventBox from '../components/EventBox';
import GradientText from '../components/GradientText';
import axios, { AxiosResponse } from 'axios';

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
