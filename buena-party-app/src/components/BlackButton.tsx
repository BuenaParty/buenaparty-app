import React, { ReactNode, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    Text,
    ViewStyle,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native';
import styles from '../../assets/styles/styles';

interface BlackButtonProps {
    colors: string[];
    style?: ViewStyle;
    children?: ReactNode;
    onPress: any/*(event: GestureResponderEvent) => void*/;
}

const BlackButton: React.FC<BlackButtonProps> = ({ colors, style, children, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.blackButton}
        >
            <LinearGradient 
                colors={["#A12577", "#42286C"]}
                style={[styles.blackButtonBorder, style]}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default BlackButton;