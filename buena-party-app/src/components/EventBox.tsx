import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet
} from 'react-native';
import GradientText from './GradientText';
import Images from './Images';
import Countdown from './Countdown';
import { useNavigation, useRoute } from '@react-navigation/native';

interface EventBoxProps {
  colors: string[];
  style?: ViewStyle;
  eventName: string;
  isCreator: boolean;
  iconSource: { uri: string } | number;
  onPress: (event: GestureResponderEvent) => void;
}

const EventBox: React.FC<EventBoxProps> = ({ colors, style, eventName, isCreator, onPress, iconSource }) => {
  const navigation = useNavigation();
  
  const handleGearPress = () => {
    //Navegar para a página de gerenciamento de eventos se o usuário for o criador do evento
    if (isCreator) {
      navigation.navigate('ManageEvent', { eventName });
    }
  };

  return (
    <LinearGradient colors={["#A12577", "#42286C"]} style={[styles.eventBoxBorder, style]}>
      <View style={styles.eventBox}>
        <View style={styles.eventBoxTitle}>
          <GradientText style={styles.eventBoxText}>{eventName}</GradientText>
          <TouchableOpacity onPress={onPress}>
            <Images style={styles.iconEvent} iconSource={require('./path/to/your/plusIcon.png')} />
          </TouchableOpacity>
          {isCreator && (
            <TouchableOpacity onPress={handleGearPress}>
              <Images style={styles.iconEvent} iconSource={require('./path/to/your/gearIcon.png')} />
            </TouchableOpacity>
          )}
        </View>
        <Countdown colors={colors} eventDateTime={eventDateTime}></Countdown>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    iconEvent: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
})
export default EventBox;
