import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Background from '../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import NavBar2 from '../components/NavBar2';
import GradientButtonL from '../components/GradientButtonL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../components/Images';

type HomeScreenProps = {
    navigation: StackNavigationProp<any>;
};
const baseTextSize = 29; // Tamanho de fonte base (por exemplo, 16)

const { width, height } = Dimensions.get('screen');
const screen = Dimensions.get('screen');
const textSize = (screen.width * 0.2 * baseTextSize) / 100;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {

        const fetchUserName = async () => {
            try {
                const userStoredName = await AsyncStorage.getItem('nomeUser');
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
        <Background colors={[]} style={style.container}>
            <SafeAreaView style={style.container}>

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
                <View style={style.textBox}>
                    <Text style={{ fontSize: textSize, color: 'white', fontWeight: "bold",textAlign: 'center' }}>Usuário logado: {userName}</Text>

                    <Text style={{ fontSize: textSize, color: 'white', fontWeight: "bold",textAlign: 'center' }}>Você não está participando de nenhum evento? Crie ou entre em um evento.</Text>
                </View>
                <View style={style.buttons}>




                    <View style={style.buttonBox}>
                        <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Create Event')}>
                            <Text style={styles.gradientButtonLText}>Criar Evento</Text>
                        </GradientButtonL>
                        <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Home Screen 2')}>
                            <Text style={styles.gradientButtonLText}>Ver eventos</Text>
                        </GradientButtonL>
                        <GradientButtonL colors={[]} style={styles.gradientButtonL} onPress={() => navigation.navigate('Edit Account')}>
                            <Text style={styles.gradientButtonLText}>Editar Conta</Text>
                        </GradientButtonL>
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
};

const style = StyleSheet.create({
    main: {
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBox: {

    },
    textBox: {
        width:width/1.3,
       
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
});

export default HomeScreen;