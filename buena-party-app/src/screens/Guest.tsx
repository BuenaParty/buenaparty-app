import React, { useEffect, useState } from "react"
import Background from "../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import styles from "../../assets/styles/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import GuestsBox from "../components/GuestsBox";
import GradientButtonL from "../components/GradientButtonL";
import Images from "../components/Images";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

type GuestsProps = {
    navigation: StackNavigationProp<any>;
    route: any;
};
const { width, height } = Dimensions.get('screen')

const Guests: React.FC<GuestsProps> = ({ navigation, route }) => {
    const [guests, setGuests] = useState([]);
    const eventId = route.params?.eventId;
    console.log('ID:', eventId);

    const handleGoBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/event/guests/${eventId}`);
                console.log('Dados do response:', response.data);
    
                // Verifique se guests existe e não está vazio antes de atualizar o estado
                if (response.data.guests && response.data.guests.length > 0) {
                    setGuests(response.data.guests);
                }
            } catch (error) {
                console.error(`Erro ao obter lista de convidados: ${error}`);
            }
        };
    
        fetchData();
    }, [eventId]);
    
    

    return (
        <Background colors={[]} >
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
                <Text style={style.text}>Convidados</Text>
                <GradientButtonL colors={[]} onPress={() => navigation.navigate('InviteCode')} style={style.buttons}>
                    <Text style={styles.gradientButtonLText}>Mostrar código de convite</Text>
                </GradientButtonL>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {guests.map((guest) => (
                        <GuestsBox key={guest.id} data={guest} />
                    ))}
                </ScrollView>
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
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:'10%'
    },
    formBox: {
        alignItems: 'center',
    },
    buttons:{
        marginBottom:'7%'
    },
});
export default Guests;