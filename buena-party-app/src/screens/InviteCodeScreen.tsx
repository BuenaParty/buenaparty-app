import React from "react"
import Background from "../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import GradientButtonS from "../components/GradientButtonS";
import BlackButton from "../components/BlackButton";
import styles from "../../assets/styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import InviteCode from "../components/InviteCode";
import GradientButtonM from "../components/GradientButtonM";
import Images from "../components/Images";

type InviteCodeScreenProps = {
    navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen')

const baseTextSize = 20;
const textSize = (screen.width * 0.3 * baseTextSize) / 100;

const InviteCodeScreen: React.FC<InviteCodeScreenProps> = ({ navigation }) => {
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
                <Text style={style.text}>Gerar código de convite</Text>
                {/*<View style={style.code}>
                    <InviteCode colors={[]} />
                </View>*/ }
                <View style={style.box}>
                    <View style={style.smallButtons}>
                        <GradientButtonS onPress={() => navigation.navigate('Edit Event')} colors={[]} style={{ flexDirection: 'row' }}>
                            <Text style={[styles.gradientButtonSText, { width: '40%' }]}>
                                Copiar código

                            </Text>
                            <Image
                                style={styles.imageCode}
                                source={require('../../assets/icons/copy.png')}
                            />
                        </GradientButtonS>
                        <View style={{ margin: 16 }}></View>
                        <GradientButtonS onPress={() => navigation.navigate('Edit Event')} colors={[]} style={{ flexDirection: 'row' }}>
                            <Text style={[styles.gradientButtonSText, { width: '40%' }]}>
                                Enviar código

                            </Text>
                            <Image
                                style={styles.imageCode}
                                source={require('../../assets/icons/share.png')}
                            />
                        </GradientButtonS>
                    </View>
                    <View >
                        <GradientButtonM colors={[]} onPress={[]}>
                            <Text style={styles.gradientButtonMText}>
                                Confirmar
                            </Text>
                        </GradientButtonM>
                        <BlackButton onPress={[]} colors={[]} style={styles.blackButton}>
                            <Text style={styles.blackButtonText}>Deletar Evento</Text>
                        </BlackButton>
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
        fontWeight: 'bold'
    },
    box:{
        alignItems:'center',
        justifyContent:'center',
        width:width,
        height:height,
    },
});
export default InviteCodeScreen;