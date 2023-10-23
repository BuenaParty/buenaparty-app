import { StyleSheet,Dimensions} from "react-native";
const{width,height} = Dimensions.get('screen')
const styles = StyleSheet.create({

    /*BOTÕES GRADIENTE*/

    gradientButtonL: {
        
        width:width/1.2,
        height:width/5.3,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
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
        width:width/1.8,
        height:width/5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,

    },
    gradientButtonMText: {
        fontFamily: 'Strong',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    gradientButtonS: {
        height: 60,
        width: 130,
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
        height: 70,
        width: 220,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackButtonText: {
        padding: 18,
        textAlign: 'center',
        flex: 0,
        color: '#A12577',
        width: 215,
        height: 65,
        borderRadius: 13,
        backgroundColor: '#000000',
        fontFamily: 'Strong',
        fontSize: 24,
        fontWeight: 'bold',
    },
    blackButton: {
        height: 70,
        width: 220,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    /*FORMS*/

    formBoxBorder: {
        //height: 70,
        //width: 320,
        width:width/1.23,
        height:width/5.4,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    formBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width:width/1.25,
        height:width/6,
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
        top:30,
    },
    LogoBranca: {
        
        

    },

    //NAV BAR2
    boxImage2:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        position: 'relative',
        
    },
    profile:{
        left:160 ,
        top:30
    },
    
    //EVENT BOX
    eventBoxBorder: {
        height: 180,
        width: 340,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    eventBox: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 175,
        width: 335,
        borderRadius: 15,
        margin: 10,
        justifyContent: 'space-evenly',
    },
    eventBoxTitle: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    eventBoxText: {
        fontSize: 30,
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
        width: 30,
        height: 30,
        marginRight: 15,
    },
    iconEventDark: {
        width: 25,
        height: 25,
        marginRight: 15,
    },
    countdownBoxBorder: {
        height: 60,
        width: 40,
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
        height: 55,
        width: 35,
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
        margin: 10,
    },
    countdownText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    countdownBottom: {

    },
    divider: {
        fontSize: 40,
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
        width: 320,
      },
      header: {
        margin: 2,
        padding: 22,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
      },
      headerExpanded: {
        margin: 2,
        padding: 10,
        backgroundColor: '#D3D3D3',
        borderRadius: 15,
        width: 316,
      },
      headerText: {
        fontSize: 20,
        width: '100%',
      },
      content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        margin: 2,
      },
      headerTextExpanded: {
        fontSize: 20,
        width: '100%',
        color: '#FFFFFF',
      },
});

export default styles;