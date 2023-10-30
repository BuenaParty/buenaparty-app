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
            <Background colors={[]} style={style.container}>
                <SafeAreaView style={style.container}>
                    <View style={style.boxImage}>
                        {/* Código para navegar de volta para a tela de detalhes do evento */}
                    </View>
                    <Text style={{ fontSize: textSize, color: 'white', fontWeight: 'bold', marginBottom: 38 }}>Editar Evento</Text>
                    <ScrollView contentContainerStyle={style.formBox}>
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

export default EditEvent;