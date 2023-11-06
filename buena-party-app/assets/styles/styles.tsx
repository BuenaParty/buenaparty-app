import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen')
const baseTextSize = 30;
const baseTextSize2 = 22;
const baseTextSize3 = 40;
const baseTextSize4 = 24;
const baseTextSize5 = 20;
const screen = Dimensions.get('screen');
const textSize = (screen.width * 0.3 * baseTextSize) / 100;
const textSize22 = (screen.width * 0.3 * baseTextSize2) / 100;
const textSize40 = (screen.width * 0.3 * baseTextSize3) / 100;
const textSize25 = (screen.width * 0.2 * baseTextSize4) / 100;
const textSize20 = (screen.width * 0.2 * baseTextSize5) / 100;
const styles = StyleSheet.create({

    /*BOTÕES GRADIENTE*/

    gradientButtonL: {

        width: width / 1.2,
        height: height / 11,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    gradientButtonLText: {
        fontFamily: 'Strong',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    gradientButtonM: {
        //height: 70,
        //width: 220,
        width: width / 2,
        height: height / 9,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,

    },
    gradientButtonMText: {
        fontFamily: 'Strong',
        fontSize: textSize22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    gradientButtonS: {
        height: height / 11,
        width: width / 3,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    gradientButtonSText: {
        fontFamily: 'Strong',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    /*BOTÕES PRETOS*/

    blackButtonBorder: {
        height: height/12,
        width: width / 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackButtonText: {
        textAlign: 'center',
        flex: 0,
        color: '#A12577',
        width: width / 2.1,
        padding:height*0.02,
        borderRadius: 13,
        backgroundColor: '#000000',
        fontFamily: 'Strong',
        fontSize: textSize25,
        fontWeight: 'bold',
    },
    blackButton: {
        height: height / 12,
        width: width / 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    /*FORMS*/

    formBoxBorder: {
        //height: 70,
        //width: 320,
        width: width / 1.23,
        height: height / 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    formBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: width / 1.25,
        height: height / 11,
        borderRadius: 15,
        margin: 10,

    },

    formBoxTextInput: {
        color: '#D3D3D3',
        width: '75%',
        fontSize: 22,
        fontFamily: 'Strong'
    },

    imageFormBox: {
        height: 30,
        width: 30,
        resizeMode: 'stretch',
        alignItems: 'center',
        margin: 15,
    },

    //NAV BAR

    boxImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',


    },
    back: {
        right: 120,
        top: 30,
    },


    //NAV BAR2
    boxImage2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        marginBottom: 40

    },
    profile: {
        width: width / 6,
        height: width / 6,
    },
    LogoBranca: {
        width: width / 4,
        height: width / 4,
        alignItems: 'center',
        marginRight: width / 6,
    },

    //EVENT BOX
    eventBoxBorder: {
        height: height / 4,
        width: width / 1.1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    eventBox: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: height / 4,
        width: width / 1.1,
        borderRadius: 15,
        margin: 10,
        justifyContent: 'space-evenly',
    },
    eventBoxTitle: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        textAlign: 'center',

    },
    eventBoxText: {
        fontSize: textSize,
        fontFamily: 'Strong',
        fontWeight: 'bold',
        marginLeft: 15,
    },
    eventBoxDark: {
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.12)",
        height: 150,
        width: 350,
        borderRadius: 15,
        margin: 10,
        justifyContent: 'space-evenly',
    },
    eventBoxTitleDark: {
        top: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '10%',
    },
    eventBoxTextDark: {
        fontSize: 30,
        fontFamily: 'Strong',
        fontWeight: 'bold',
        marginLeft: 15,
    },
    iconEvent: {
        width: width / 11,
        height: height / 19,
        marginRight: 15,
    },
    iconEventDark: {
        width: 25,
        height: 25,
        marginRight: 15,
    },
    countdownBoxBorder: {
        height: height / 10,
        width: width / 9,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        margin: 5,
    },
    countdownBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D3D3D3',
        height: height / 11,
        width: width / 10,
        borderRadius: 15,
    },
    countdownBoxDark: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#131313',
        height: 55,
        width: 35,
        borderRadius: 15,
    },
    countdownTop: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    countdown: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    countdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
        borderRadius: 15,
        margin: 0,
        flex: 1
    },
    countdownText: {
        fontSize: textSize22,
        fontWeight: 'bold',
    },
    countdownBottom: {
        flex: 1
    },
    divider: {
        fontSize: textSize40,
        bottom: 18,
    },

    // INVITE CODE

    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    codeSide: {
        flexDirection: 'row',
    },
    codeDivider: {
        fontSize: 40,
    },
    codeBorderBox: {
        height: 60,
        width: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
    },
    codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#151515',
        height: 55,
        width: 35,
        borderRadius: 15,
    },
    imageCode: {
        height: 20,
        width: 20,
        marginRight: 4,
        marginLeft: 4
    },
    textCode: {
        fontFamily: 'Strong',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    //GUESTS BOX

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        borderRadius: 15,
        width: width / 1.9,
    },
    header: {
        margin: 2,
        padding: width / 22,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },
    headerExpanded: {
        margin: 2,
        padding: width / 30,
        backgroundColor: '#D3D3D3',
        borderRadius: 15,
        width: width / 1.9,
    },
    headerText: {
        fontSize: textSize20,
        width: '100%',
    },
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        margin: 2,
    },
    headerTextExpanded: {
        fontSize: textSize20,
        width: '100%',
        color: '#FFFFFF',
    },
});

export default styles;