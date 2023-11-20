import React, { useState } from 'react'
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import EventBoxDark from '../components/EventBoxDark';
import GradientButtonL from '../components/GradientButtonL';
import Images from '../components/Images';
import { useRoute } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'; // biblioteca do qrcode

type EventInfoProps = {
    navigation: StackNavigationProp<any>;
    route: {
        params: {
            eventName: string;
        };
    };
    userId: string;
};

const { width, height } = Dimensions.get('screen')
const baseTextSize = 25;
const textSize = (screen.width * 0.3 * baseTextSize) / 100;

const EventInfo: React.FC<EventInfoProps> = ({ navigation, route, userId }) => {
    const { params } = useRoute();
    const eventName = params && 'eventName' in params ? params.eventName : 'Carregando...'

    // Função para gerar o conteúdo do QR code com base no ID do usuário
    const generateQRContent = (userId: string) => {
        return `User ID: ${userId}`;
    };

    // Estado para armazenar o conteúdo do QR code
    const [qrContent, setQrContent] = useState(generateQRContent(userId));

    // Função para atualizar o conteúdo do QR code quando necessário
    const updateQRContent = () => {
    // Chame esta função para atualizar o conteúdo do QR code, se necessário
        setQrContent(generateQRContent(userId));
    };
      
    const [qrValue, setQrValue] = useState("");

    const generateQRCode = () => {
        // Defina o conteúdo do QR code como desejado, por exemplo, a rota 'Event Info'
        setQrValue('Event Info');
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
                <Text style={style.text}>
                    {typeof eventName === 'string' ? eventName : 'Carregando...'}
                </Text>
                <View style={style.box}>
                    {/*<EventBoxDark
                        colors={[]}
                        iconSource={require('../../assets/icons/more.png')}
                        onPress={() => navigation.navigate('Event Details')}
    />*/}
                    <View style={style.qrCodeBox}>
                        <View style={style.containerQr}>
                            <QRCode
                            value={qrValue ? qrValue : 'NA'}
                            size={250}
                            color="black"
                            backgroundColor="white"
                            //logoSize={25}
                            //logoMargin={2}
                            //logoBorderRadius={15}
                            //logoBackgroundColor="white"
                            />
                        </View>
                        <View style={style.containerqr}>
                            <View style={{margin:5}}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        {/* Adicionando GradientButtonL abaixo */}
                        <GradientButtonL
                            colors={[]}
                            onPress={() => navigation.navigate('Feed')}
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
    containerQr: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    containerqr: {
        flex: 1,
        justifyContent: 'center',
    }
});
export default EventInfo;