import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native';
import styles from '../../assets/styles/styles';

interface GradientButtonSProps {
    colors: string[];
    style?: ViewStyle;
    children?: ReactNode;
    onPress: any /*(event: GestureResponderEvent) => void*/;
}

const GradientButtonS: React.FC<GradientButtonSProps> = ({ colors, style, children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient 
                colors={["#A12577", "#42286C"]}
                style={[styles.gradientButtonS, style]}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButtonS;