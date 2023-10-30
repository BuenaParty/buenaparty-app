// No componente CreateAccountount

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Background from '../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../components/Images';
import NavBar from '../components/NavBar';
import FormBox from '../components/FormBox';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

type EditEventProps = {
    route: { params: {eventId: number } };
    navigation: StackNavigationProp<any>;
};
const baseTextSize = 29;
const screen = Dimensions.get('screen');
const textSize = (screen.width * 0.2 * baseTextSize) / 100;

const { width, height } = Dimensions.get('screen');

const EditEvent: React.FC<EditEventProps> = ({ navigation, route }) => {
    const { eventId } = route.params;

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/event/${eventId}`);
                const eventData = response.data;

                console.log('eventData:', eventData);
                setNome(eventData.nome);
                setEndereco(eventData.endereco);
                setData(eventData.data);
                setHorario(eventData.horario);
                
            } catch (error) {
                console.error('Erro ao buscar dados do evento:', error);
            }
        };

        fetchEventData();
    }, [eventId]);
 
    const handleGoBack = () => {
        navigation.goBack();
    }
    
    const handleEdit = async () => {
        try {
            await axios.put(`http://localhost:3000/event/update/${eventId}`, {
                nome,
                endereco,
                data,
                horario,
        });

            navigation.navigate('ListEvents', { eventId });
        } catch (error) {
            console.error('Erro ao editar evento:', error);
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
                    <Text style={{ fontSize: textSize, color: 'white', fontWeight: 'bold', marginVertical: 50 }}>Editar Evento</Text>
                    <View style={style.formBox}>
                        <FormBox
                            colors={[]}
                            placeholder={nome}
                            iconSource={require('../../assets/icons/party.png')}
                            onChange={text => setNome(text)}
                            value={nome}
                        />
                        <FormBox
                            colors={[]}
                            placeholder={endereco}
                            iconSource={require('../../assets/icons/address.png')}
                            onChange={text => setEndereco(text)}
                            value={endereco}
                        />
                        <FormBox
                            colors={[]}
                            placeholder={`${data}`}
                            iconSource={require('../../assets/icons/date.png')}
                            onChange={text => setData(text)}
                            value={data}
                        />
                        <FormBox
                            colors={[]}
                            placeholder={`${horario}`}
                            iconSource={require('../../assets/icons/hour.png')}
                            onChange={text => setHorario(text)}
                            value={horario}
                        />
                    </View>
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
    text: {
        flex:2,

    },
    profile: {
        width: width / 4,
        height: width / 4,
        marginBottom: 25
    },
    formBox: {
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
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
      main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        position: 'absolute',
      },
});

export default EditEvent;