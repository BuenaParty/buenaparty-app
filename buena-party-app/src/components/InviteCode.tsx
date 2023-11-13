import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Text } from 'react-native';
import styles from '../../assets/styles/styles';
import GradientText from './GradientText';

interface InviteCodeProps {
  colors: string[];
  style?: any;
  code: string;
}

const InviteCode: React.FC<InviteCodeProps> = ({ colors, style, code }) => {
  const renderDigit = (digit, index) => (
    <LinearGradient colors={colors} style={styles.codeBorderBox} key={index}>
      <View style={styles.codeBox}>
        <Text style={styles.textCode}>{digit}</Text>
      </View>
    </LinearGradient>
  );

  const renderDivider = () => (
    <GradientText style={styles.codeDivider}>-</GradientText>
  );

  
  const digits = code.split('');

  return (
    <View style={[styles.codeContainer, style]}>
      <View style={styles.codeSide}>
        {digits.map((digit, index) => (
          <React.Fragment key={index}>
            {renderDigit(digit, index)}
            {index < digits.length - 1 && renderDivider()}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default InviteCode;
