import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TextInput, Image, TextStyle, ViewStyle } from 'react-native';
import styles from '../../assets/styles/styles';

interface FormBoxProps {
  colors?: string[];
  style?: {
    formBox?: ViewStyle;
    formBoxTextInput?: TextStyle;
    imageFormBox?: ViewStyle;
    formBoxBorder?: ViewStyle;
  };
  placeholder?: string;
  children?: React.ReactNode;
  iconSource: { uri: string } | number;
  onChange: (value: string) => void; // Atualizado para receber o valor como argumento
  value: string;
}

const FormBox: React.FC<FormBoxProps> = ({ colors, style, placeholder, children, iconSource, onChange, value}) => {

  const handleInputChange = (text: string) => {
    onChange(text); // Chama a função onChange passando o valor do campo de entrada
  };

  return (
    <LinearGradient colors={["#A12577", "#42286C"]} style={[styles.formBoxBorder]}> 
      {children}
      <View style={styles.formBox}>
        <Image style={styles.imageFormBox} source={iconSource}/>
        <TextInput
          style={styles.formBoxTextInput}
          placeholder={placeholder}
          onChangeText={handleInputChange} // Use onChangeText para capturar as alterações no texto
          value={value} // Passe o valor como propriedade value
        />
      </View>
    </LinearGradient>
  );
};

export default FormBox;
