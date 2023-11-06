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

interface InviteCodeProps {
  colors: string[];
  style?: ViewStyle;
  children?: ReactNode;
}

const InviteCode: React.FC<InviteCodeProps> = ({ colors, style, children }) => {
  return (
    <View style={styles.codeContainer}>
        <View style={styles.codeSide}>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
        </View>
        <GradientText style={styles.codeDivider}>-</GradientText>
        <View style={styles.codeSide}>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
            <LinearGradient
                colors={["#A12577", "#42286C"]}
                style={styles.codeBorderBox}
            >
                <View style={styles.codeBox}>
                    
                </View>
            </LinearGradient>
        </View>
    </View>
            
        
    
  );
};

export default InviteCode;