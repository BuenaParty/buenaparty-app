import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import GradientButtonS from '../components/GradientButtonS';
import GradientButtonM from '../components/GradientButtonM';
import EventBox from '../components/EventBox';
import GradientText from '../components/GradientText';
import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import Images from '../components/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Event = {
  id: number;
  criado_por: string;
  nome: string;
  data: string;
  horario: string;
  endereco: string;
};
const { width, height } = Dimensions.get('screen')

type ListEventsProps = {
  navigation: StackNavigationProp<any>;
};

const urlAPI = 'http://localhost:3000';

const ListEvents: React.FC<ListEventsProps> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [guestEvents, setGuestEvents] = useState<Event[]>([]);

  const showDeleteConfirmation = (event: Event) => {
    setEventToDelete(event);
    setDeleteConfirmationVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setEventToDelete(null);
    setDeleteConfirmationVisible(false);
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      handleDeleteEvent(eventToDelete.id);
    }
    hideDeleteConfirmation();
  };


  useEffect(() => {
    const loadEvents = async () => {
      try {
        const loggedInUserId = await AsyncStorage.getItem('idUser');
        
        console.log('Logged In User ID:', loggedInUserId);
  
        if (loggedInUserId) {
          const userEventsResponse = await axios.get(`${urlAPI}/events/byuser/${loggedInUserId}`);
  
          console.log('User Events Response:', userEventsResponse.data);
  
          if (userEventsResponse.status === 200 && userEventsResponse.data && userEventsResponse.data.events) {
            setEvents(userEventsResponse.data.events);
          } else {
            console.log('Nenhum evento criado pelo usuário encontrado.');
          }
  
          const guestEventsResponse = await axios.get(`${urlAPI}/event/guest/${loggedInUserId}`);
  
          console.log('Guest Events Response:', guestEventsResponse.data);
  
          if (guestEventsResponse.status === 200 && guestEventsResponse.data && guestEventsResponse.data.events) {
            setGuestEvents(guestEventsResponse.data.events);
          } else {
            console.log('Nenhum evento em que o usuário é convidado foi encontrado.');
          }
        } else {
          console.log('User ID not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
  
    loadEvents();
  
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      // Enviar uma solicitação DELETE para o servidor para excluir o evento.
      await axios.delete(`${urlAPI}/event/delete/${eventId}`);
  
      // Atualizar o estado local removendo o evento excluído.
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Erro ao excluir o evento:', error);
    }
  };

  const navigateToGuests = async (eventId) => {
    try {
      // Armazenar o ID do evento no AsyncStorage
      await AsyncStorage.setItem('selectedEventId', eventId.toString());
      console.log(eventId)
      
      // Navegar para a tela de Convidados
      navigation.navigate('Guests');
    } catch (error) {
      console.error('Erro ao armazenar o ID do evento:', error);
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
        <View style={style.container}>
          <View style={style.buttonContainer}>
            <GradientButtonS colors={[]} onPress={() => navigation.navigate('CreateEvent')}>
              <Text style={styles.gradientButtonSText}>Criar evento</Text>
            </GradientButtonS>
          </View>
          <View style={style.eventContainer}>
            <Text style={style.text}>Eventos</Text>
            {events.length > 0 ? (
              events.map((event) => (
                <View key={event.id} style={style.eventBox}>
                  <GradientText style={style.text}>Nome: {event.nome}</GradientText>
                  <Text style={style.text}>Data: {event.data}</Text>
                  <Text style={style.text}>Hora: {event.horario}</Text>
                  <Text style={style.text}>Endereço: {event.endereco}</Text>
                  <View style={style.buttonContainer}>
                    <GradientButtonS colors={[]} onPress={() => navigation.navigate('EditEvent', { eventId: event.id })}>
                    <Text style={styles.gradientButtonSText}>Editar evento</Text>
                    </GradientButtonS>
                    <GradientButtonS
                      colors={[]}
                      onPress={() => showDeleteConfirmation(event)}
                    >
                      <Text style={styles.gradientButtonSText}>Deletar evento</Text>
                    </GradientButtonS>
                  </View>
                  <View style={style.buttonContainer}>
                    <GradientButtonM onPress={() => navigateToGuests(event.id)} colors={[]} >
                        <Text style={styles.gradientButtonLText}>Convidados</Text>
                    </GradientButtonM>
              </View>
              </View>
        ))
      ) : (
        <Text style={style.noEventsText}>Nenhum evento encontrado.</Text>
      )}

      {/* Modal de confirmação de exclusão */}
      <Modal isVisible={isDeleteConfirmationVisible}>
        <View style={style.modalContainer}>
          <Text style={style.modalText}>Tem certeza de que deseja excluir este evento?</Text>
          <Button mode="contained" onPress={confirmDeleteEvent}>
            Confirmar
          </Button>
          <Button mode="text" onPress={hideDeleteConfirmation}>
            Cancelar
          </Button>
        </View>
      </Modal>
            <Text style={style.text}>Eventos convidados</Text>
              {guestEvents.length > 0 ? (
                guestEvents.map((guestEvent) => (
                  <View key={guestEvent.id} style={style.eventBox}>
                    <GradientText style={style.text}>Nome: {guestEvent.nome}</GradientText>
                    <Text style={style.text}>Data: {guestEvent.data}</Text>
                    <Text style={style.text}>Hora: {guestEvent.horario}</Text>
                    <Text style={style.text}>Endereço: {guestEvent.endereco}</Text>
                    <View style={style.buttonContainer}>
                    </View>
                    <View style={style.buttonContainer}>
                      <GradientButtonM onPress={() => navigation.navigate('EventInfo', { eventName: guestEvent.nome })} colors={[]} >
                          <Text style={styles.gradientButtonLText}>Informações</Text>
                      </GradientButtonM>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={style.noEventsText}>Nenhum evento em que o usuário é convidado foi encontrado.</Text>
              )}
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
    fontSize: 34,
    fontWeight: 'bold',
    padding: 10,
  },
  container: {
    top: 50,
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
    marginHorizontal: 20,
  },
  noEventsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
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
});

export default ListEvents;
