import React from 'react'
import Background from '../components/Background';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../components/Images';
import NavBar from '../components/NavBar';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import GradientBox from '../components/GradientBox';
import InviteCode from '../components/InviteCode';

type EnterEventProps = {
    navigation: StackNavigationProp<any>;
};
const { width, height } = Dimensions.get('screen')
const baseTextSize = 25;
const textSize = (screen.width * 0.3 * baseTextSize) / 100;

const EnterEvent: React.FC<EnterEventProps> = ({ navigation }) => {
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
                <Text style={style.text}>Entrar Evento</Text>
                <View style={style.boxContainer}>
                    <GradientBox colors={[]} iconSource={require('../../assets/icons/danca.png')}>
                        <Text style={styles.formBoxTextInput}>

                        </Text>
                    </GradientBox>
                    <GradientBox colors={[]} iconSource={require('../../assets/icons/phone.png')}>
                        <Text style={styles.formBoxTextInput}>

                        </Text>
                    </GradientBox>
                    <GradientBox colors={[]} iconSource={require('../../assets/icons/email.png')}>
                        <Text style={styles.formBoxTextInput}>

                        </Text>
                    </GradientBox>
                    {/*<View style={style.code}>
                    <InviteCode colors={[]} />
                    </View>*/ }
                </View>

                <View style={style.button}>
                    <GradientButtonM onPress={() => navigation.navigate('Event Details')} colors={[]}>
                        <Text style={styles.gradientButtonMText}>Gerar QR Code</Text>
                    </GradientButtonM>
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
        fontWeight: 'bold',
        fontSize: textSize,

    },
    button: {
        top: '140%',
        position: 'absolute'
    },
    boxContainer:{
        top:60
    },
});
export default EnterEvent;