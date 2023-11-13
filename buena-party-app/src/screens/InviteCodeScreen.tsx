import React, { useEffect, useState } from "react"
import Background from "../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Linking } from "react-native";
import GradientButtonS from "../components/GradientButtonS";
import BlackButton from "../components/BlackButton";
import styles from "../../assets/styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import InviteCode from "../components/InviteCode";
import GradientButtonM from "../components/GradientButtonM";
import Images from "../components/Images";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from '@react-native-clipboard/clipboard';
import DrawerCollapsedItem from "react-native-paper/lib/typescript/components/Drawer/DrawerCollapsedItem";

type InviteCodeScreenProps = {
    navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen')

const baseTextSize = 20;
const textSize = (screen.width * 0.3 * baseTextSize) / 100;
const urlAPI = 'http://localhost:3000';

const InviteCodeScreen: React.FC<InviteCodeScreenProps> = ({ navigation }) => {
    const [codigoConvite, setCodigoConvite] = useState<string | null>(null);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCopyCode = async () => {
        try {
          if (Clipboard) {
            await Clipboard.setString(codigoConvite || '');
            console.log('Código copiado para a área de transferência.');
          } else {
            console.error('Área de transferência indisponível.');
          }
        } catch (error) {
          console.error('Erro ao copiar código para a área de transferência:', error);
        }
      };
      

    const handleShareCode = () => {
        if (codigoConvite) {
          // Pode ser implementada a lógica para enviar por e-mail ou WhatsApp aqui
          // Exemplo: Enviar por e-mail
          Linking.openURL(`mailto:?subject=Convite de Evento&body=${codigoConvite}`);
        }
      };

    useEffect(() => {
        const fetchCodigoConvite = async () => {
            try {
                // Obter o ID do evento armazenado no AsyncStorage
                const selectedEventId = await AsyncStorage.getItem('selectedEventId');
        
                if (selectedEventId) {
                  // Substituir ":id" pelo ID do evento
                  const response = await axios.get(`${urlAPI}/event/${selectedEventId}/code`);
                  setCodigoConvite(response.data.code);
                } else {
                  console.log('ID do evento não encontrado no AsyncStorage.');
                }
              } catch (error) {
                console.error('Erro ao obter código de convite:', error);
              }
            };

        fetchCodigoConvite();
    }, []);

    return (
        <Background colors={[]}>
            <SafeAreaView style={style.main}>
                <View style={style.boxImage}>
                    <TouchableOpacity onPress={handleGoBack}>
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
                <Text style={style.text}>Código de convite</Text>
                {codigoConvite !== null ? (
                    <View>
                        <InviteCode colors={['#A12577', '#42286C']} code={codigoConvite} />
                    </View>
                ) : (
                    <Text style={style.text}>Carregando código...</Text>
                )}
                <View style={style.box}>
                    <View style={style.smallButtons}>
                        <GradientButtonS onPress={handleCopyCode} colors={[]} style={{ flexDirection: 'row' }}>
                            <Text style={[styles.gradientButtonSText, { width: '40%' }]}>
                                Copiar código

                            </Text>
                            <Image
                                style={styles.imageCode}
                                source={require('../../assets/icons/copy.png')}
                            />
                        </GradientButtonS>
                        <View style={{ margin: 16 }}></View>
                        <GradientButtonS onPress={handleShareCode} colors={[]} style={{ flexDirection: 'row' }}>
                            <Text style={[styles.gradientButtonSText, { width: '40%' }]}>
                                Enviar código

                            </Text>
                            <Image
                                style={styles.imageCode}
                                source={require('../../assets/icons/share.png')}
                            />
                        </GradientButtonS>
                    </View>
                    <View style={style.box} >
                        <GradientButtonM colors={[]} onPress={[]}>
                            <Text style={styles.gradientButtonMText}>
                                Confirmar
                            </Text>
                        </GradientButtonM>
                        {/*<BlackButton onPress={[]} colors={[]} style={styles.blackButton}>
                            <Text style={styles.blackButtonText}>Deletar Evento</Text>
                        </BlackButton>*/}
                    </View>
                </View>
            </SafeAreaView>
        </Background >
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
        top: 0,
        position: 'absolute',
        
    },
    smallButtons: {
        flexDirection: 'row',
        alignItems:'center',
        bottom:'14%'

    },
    text: {
        color: 'white',
        fontSize: textSize,
        fontWeight: 'bold',
        margin: 50,
    },
    box:{
        alignItems:'center',
        justifyContent:'center',
        margin: 50,
    },
});
export default InviteCodeScreen;