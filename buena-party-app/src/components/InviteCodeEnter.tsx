import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../assets/styles/styles';

interface InviteCodeEnterProps {
  colors: string[];
  style?: any;
  onCodeChange: (code: string) => void;
}

const InviteCodeEnter: React.FC<InviteCodeEnterProps> = ({ colors, style, onCodeChange }) => {
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(''));
  const inputRefs: React.RefObject<TextInput>[] = Array.from({ length: 6 }, () => useRef<TextInput>(null));

  useEffect(() => {
    // Ensure the first input is focused initially
    inputRefs[0]?.current?.focus();
  }, []);

  const handleInputChange = (text: string, index: number) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = text;
  
      if (text.length === 1 && index < newValues.length - 1) {
        // Focus on the next TextInput
        inputRefs[index + 1]?.current?.focus();
      } else if (text.length === 0 && index > 0) {
        // Focus on the previous TextInput when backspacing
        inputRefs[index - 1]?.current?.focus();
      }
  
      const code = newValues.join('');
      onCodeChange(code);
  
      return newValues;
    });
  };

  const renderDigitInput = (value: string, index: number) => (
    <LinearGradient key={index} colors={colors} style={[styles.codeBorderBox, style]}>
      <View style={styles.codeBox}>
        <TextInput
          caretHidden={true}
          style={styles.textCodeEnter}
          maxLength={1}
          onChangeText={(text) => handleInputChange(text, index)}
          ref={inputRefs[index]}
          value={value}
        />
      </View>
    </LinearGradient>
  );

  return (
    <View style={[styles.codeContainer, style]}>
      <View style={styles.codeSide}>
        {inputValues.map((value, index) => renderDigitInput(value, index))}
      </View>
    </View>
  );
};

const newStyle = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  },
});

export default InviteCodeEnter;