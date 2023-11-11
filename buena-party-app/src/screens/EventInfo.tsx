import React from 'react'
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import EventBoxDark from '../components/EventBoxDark';
import GradientButtonL from '../components/GradientButtonL';
import Images from '../components/Images';

type EventInfoProps = {
    navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen')
const baseTextSize = 25;
const textSize = (screen.width * 0.3 * baseTextSize) / 100;

const EventInfo: React.FC<EventInfoProps> = ({ navigation }) => {
    return (
        <Background colors={[]} style={style.container}>
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
                <Text style={style.text}>
                    Casamento de Ana
                </Text>
                <View style={style.box}>
                    <EventBoxDark
                        colors={[]}
                        iconSource={require('../../assets/icons/more.png')}
                        onPress={() => navigation.navigate('Event Details')}
                    />
                    <View style={style.qrCodeBox}>

                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {/* Adicionando GradientButtonL abaixo */}
                        <GradientButtonL
                            colors={[]}
                            onPress={() => navigation.navigate('Home Screen 2')}
                            style={style.button}
                        >
                            <Text style={styles.gradientButtonLText}>
                                Acessar o feed
                            </Text>
                        </GradientButtonL>
                    </View>
                    <Text style={style.bottomText}>O acesso ao feed só será liberado após entrada confirmada no evento.</Text>
                    
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
        fontSize: textSize,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    qrCodeBox: {
        flex: 1
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText:{
        color:'white',
        textAlign:'center'
    },
});
export default EventInfo;