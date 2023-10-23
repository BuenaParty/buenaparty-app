import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';
import styles from '../../assets/styles/styles';
import GradientText from './GradientText';
import Images from './Images';
import Countdown from './Countdown';

interface EventBoxProps {
  colors: string[];
  style?: ViewStyle;
  children?: ReactNode;
  iconSource: { uri: string } | number;
  onPress: (event: GestureResponderEvent) => void;
}

const EventBox: React.FC<EventBoxProps> = ({ colors, style, children, iconSource, onPress }) => {
  return (
    <LinearGradient
        colors={["#A12577", "#42286C"]}
        style={styles.eventBoxBorder}
    >
        <View style={styles.eventBox}>
            <View style={styles.eventBoxTitle}>
                <GradientText style={styles.eventBoxText}>
                    {children}
                </GradientText>
                <TouchableOpacity onPress={onPress}>
                  <Images
                      style={styles.iconEvent}   
                      iconSource={iconSource} 
                  />
                </TouchableOpacity>
            </View>
            <Countdown colors={[]}></Countdown>
        </View>
    </LinearGradient>
  );
};

export default EventBox;
