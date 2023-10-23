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
import CountdownDark from './CountdownDark';

interface EventBoxDarkProps {
  colors: string[];
  style?: ViewStyle;
  children?: ReactNode;
  iconSource: { uri: string } | number;
  onPress: (event: GestureResponderEvent) => void;
}

const EventBoxDark: React.FC<EventBoxDarkProps> = ({ colors, style, children, iconSource, onPress }) => {
  return (
    
        <View style={styles.eventBoxDark}>
            <View style={styles.eventBoxTitleDark}>
                
                <TouchableOpacity onPress={onPress}>
                  <Images
                      style={styles.iconEventDark}   
                      iconSource={iconSource} 
                  />
                </TouchableOpacity>
            </View>
            <CountdownDark colors={[]}></CountdownDark>
        </View>
  );
};

export default EventBoxDark;
