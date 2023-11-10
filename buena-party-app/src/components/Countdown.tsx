import React, { ReactNode, useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  ViewStyle,
  StyleSheet
} from 'react-native';
import styles from '../../assets/styles/styles';
import GradientText from './GradientText';

interface CountdownProps {
  colors: string[];
  style?: ViewStyle;
  eventDateTime: Date;
}

const Countdown: React.FC<CountdownProps> = ({ colors, style, eventDateTime }) => {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0});

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeDifference = eventDateTime.getTime() - now.getTime();

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

                setTime({ days, hours, minutes });
            } else {
                clearInterval(intervalId);
                setTime({ days: 0, hours: 0, minutes: 0 });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [eventDateTime]);

  return (
    <View style={styles.countdownContainer}>
        <View style={styles.countdown}>
            <View style={styles.countdownTop}>
                <LinearGradient colors={["#A12577", "#42286C"]} style={styles.countdownBoxBorder}>
                    <View style={styles.countdownBox}>
                        <GradientText>{String(time.days).padStart(2, '0')}</GradientText>
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBox}>
                        
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
                    <View style={styles.countdownBox}>
                        
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBox}>
                        
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
                    <View style={styles.countdownBox}>
                        
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={["#A12577", "#42286C"]}
                    style={styles.countdownBoxBorder}
                >
                    <View style={styles.countdownBox}>
                        
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

export default Countdown;
