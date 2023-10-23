import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Image,
  ViewStyle,
  StyleSheet,
  Text
} from 'react-native';
import styles from '../../assets/styles/styles';
import GradientText from './GradientText';
import Images from './Images';

interface CountdownDarkProps {
  colors: string[];
  style?: ViewStyle;
  children?: ReactNode;
}

const CountdownDark: React.FC<CountdownDarkProps> = ({ colors, style, children }) => {
  return (
    <View style={styles.countdownContainer}>
        <View style={styles.countdown}>
            <View style={styles.countdownTop}>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBoxDark}>
                        
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBoxDark}>
                        
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.countdownBottom}>
                <GradientText style={styles.countdownText}>
                    DIAS
                </GradientText>
            </View>
        </View>
        <GradientText style={styles.divider}>:</GradientText>
        <View style={styles.countdown}>
            <View style={styles.countdownTop}>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBoxDark}>
                        
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBoxDark}>
                        
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.countdownBottom}>
                <GradientText style={styles.countdownText}>
                    HORAS
                </GradientText>
            </View>
        </View>
        <GradientText style={styles.divider}>:</GradientText>
        <View style={styles.countdown}>
            <View style={styles.countdownTop}>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBoxDark}>
                        
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBoxDark}>
                        
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.countdownBottom}>
                <GradientText style={styles.countdownText}>
                    MINUTOS
                </GradientText>
            </View>
        </View>
            
    </View>
            
        
    
  );
};

export default CountdownDark;
