import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    GestureResponderEvent,
    
} from 'react-native';
import styles from '../../assets/styles/styles';

interface GradientButtonLProps {
    colors: string[];
    style?: ViewStyle;
    children?: ReactNode;
    onPress: (event: GestureResponderEvent) => void;
   
}

const GradientButtonL: React.FC<GradientButtonLProps> = ({ colors, style, children, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient 
                colors={["#A12577", "#42286C"]}
                style={[styles.gradientButtonL, style]}
            >
                
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButtonL;