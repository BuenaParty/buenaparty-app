import React from "react"
import Background from "../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import GradientButtonL from "../components/GradientButtonL";
import BlackButton from "../components/BlackButton";
import styles from "../../assets/styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import Images from "../components/Images";

type ManageEventProps = {
    navigation: StackNavigationProp<any>;
};
const baseTextSize = 29;
const screen = Dimensions.get('screen');
const textSize = (screen.width * 0.2 * baseTextSize) / 100;


const { width, height } = Dimensions.get('screen')
const ManageEvent: React.FC<ManageEventProps> = ({ navigation }) => {
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
                <View style={style.text1}>
                    <Text style={style.text}>Gerenciar Evento</Text>
                </View>
                <View style={style.buttons}>
                    <GradientButtonL onPress={() => navigation.navigate('Guests')} colors={[]} style={style.convidados}>
                        <Text style={styles.gradientButtonLText}>Convidados</Text>
                    </GradientButtonL>
                    <GradientButtonL onPress={() => navigation.navigate('Edit Event')} colors={[]} style={style.Edit}>
                        <Text style={styles.gradientButtonLText}>Editar Informações</Text>
                    </GradientButtonL>
                    <BlackButton onPress={[]} colors={[]} style={style.blackButton}>
                        <Text style={styles.blackButtonText}>Deletar Evento</Text>
                    </BlackButton>
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
        top: 0,
        position: 'absolute',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text1: {
        width: width,
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: textSize,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    Edit: {
        marginBottom: '30%'
    },

});
export default ManageEvent;