import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    ViewStyle
} from 'react-native';

interface BackgroundProps {
    colors: string[];
    style?: ViewStyle;
    children?: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ colors, style, children}) => {
    return (
        <LinearGradient 
        colors={["#070624", "#000000", "#070624"]}
        style={[styles.background, style]}>
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Background;